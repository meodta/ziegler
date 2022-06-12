import React, {useEffect, useMemo, useState} from 'react';
import { FixedSizeList } from 'react-window';
import { chunk } from 'lodash'
import RecipeCard from 'components/RecipeCard';
import {Flex, Grid, HStack, Box} from '@chakra-ui/react';
import {MultiValue, Select} from 'chakra-react-select';
import {API} from 'helpers/api.helper';
import {fetchJSON} from 'helpers/fetch.helper';
import {Recipe} from 'types/recipe.type';

type OptionType = {
  value: string;
  label: string;
};

const stringArrayToOptions = (array: string[]): OptionType[] => array.map(option => ({ label: option, value: option }))

const onDropdownChange = (newValue: MultiValue<OptionType>, setState: React.Dispatch<React.SetStateAction<string[]>>) => {
  setState(newValue.map(v => v.value))
}

const HomeView: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>()
  const [ingredients, setIngredients] = useState<OptionType[]>([])
  const [types, setTypes] = useState<OptionType[]>([])
  const [filterType, setFilterType] = useState<string[]>([])
  const [filterIngredient, setFilterIngredient] = useState<string[]>([])

  useEffect(() => {
    fetchRecipes()
    fetchTypes()
    fetchIngredients()
  }, [])

  const hasAllStringsInStrings = (as: string[], bs: string[]) => {
    return !as.some(a => !bs.includes(a))
  }

  const filterHelpers = useMemo(() => {
    if (!recipes) return
    return Object.fromEntries(recipes.map(recipe => [recipe._id, {
      types: recipe.ingredients.map(i => i.type),
      names: recipe.ingredients.map(i => i.name)
    }]))
  }, [recipes])

  const filteredRecipes = useMemo(() => {
    if (!recipes?.length) return
    if (!filterType.length && !filterIngredient.length) return recipes
    if (!filterHelpers) return
    return recipes.filter(recipe => {
      const helpers = filterHelpers[recipe._id]
      return ![hasAllStringsInStrings(filterType, helpers.types), hasAllStringsInStrings(filterIngredient, helpers.names)].some(check => !check)
    })
  }, [recipes, filterHelpers, filterType, filterIngredient])

  const chunkedRecipes = useMemo(() => {
    if (!filteredRecipes) return
    return chunk(filteredRecipes, 3)
  }, [filteredRecipes])

  const fetchRecipes = async () => {
    const json = await fetchJSON(`${API}/recipes`)
    setRecipes(json.docs as Recipe[])
  }

  const fetchIngredients = async () => {
    const json = await fetchJSON(`${API}/ingredients/unique-names`)
    setIngredients(stringArrayToOptions(json))
  }

  const fetchTypes = async () => {
    const json = await fetchJSON(`${API}/ingredients/unique-types`)
    setTypes(stringArrayToOptions(json))
  }

  return <Flex direction={'column'} align={'center'}>
    <Flex width={960} direction={'column'}>
      <Flex mb={5} justify={'right'}>
        <HStack>
          <Box width={300}>
            <Select isMulti onChange={(v) => onDropdownChange(v, setFilterType)} placeholder={'Choose ing. types'} options={types} />
          </Box>
          <Box width={300}>
            <Select isMulti onChange={(v) => onDropdownChange(v, setFilterIngredient)} placeholder={'Choose ingredients'} options={ingredients} />
          </Box>
        </HStack>
      </Flex>
      <FixedSizeList itemCount={chunkedRecipes?.length ?? 0} width={960} height={460} itemSize={460}>
        {({index, style}) => <Grid style={{...style, paddingBottom: '10px'}} templateColumns={'repeat(3, 1fr)'} gridGap={'10px'}>
          {chunkedRecipes?.[index].map(recipe => <RecipeCard recipe={recipe} key={recipe._id}></RecipeCard>)}
        </Grid>}
      </FixedSizeList>
    </Flex>
  </Flex>
}

export default HomeView
