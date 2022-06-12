import React, {useEffect, useMemo, useState} from 'react';
import {Flex, Image, Link, Box, SimpleGrid, Skeleton, Spacer, Text} from '@chakra-ui/react';
import {useParams} from 'react-router-dom';
import {Recipe} from 'types/recipe.type';
import {fetchJSON} from 'helpers/fetch.helper';
import {API} from 'helpers/api.helper';
import {ExternalLinkIcon, TimeIcon} from '@chakra-ui/icons';

const renderTime = (time: number) => {
  if (!time) return '-'
  return `${time}'`
}

const List: React.FC<React.ComponentProps<typeof SimpleGrid>> = (props) => <SimpleGrid templateColumns={'auto 1fr'} columnGap={'15px'} rowGap={'2px'} {...props}  />

const ListHeader: React.FC<React.ComponentProps<typeof Text>> = (props) => <Text fontSize={'sm'} color={'gray.600'} {...props} />

const RecipeView: React.FC = () => {
  const params = useParams()
  const [recipe, setRecipe] = useState<Recipe>()

  useEffect(() => {
    if (params.id)
      fetchRecipe(params.id)
  }, [params])

  const totalTime = useMemo(() => {
    return recipe?.timers.reduce((prev, curr) => prev + curr, 0)
  }, [recipe])

  const fetchRecipe = async (id: string) => {
    // setTimeout to test skeleton layout
    setTimeout(async () => {
      setRecipe(await fetchJSON(`${API}/recipe/${id}`))
    }, 5000)
  }

  const renderContent = () => {
    const SkeletonList = <>
      <Skeleton width={'200px'} height={'30px'} />
      <Skeleton width={'450px'} height={'300px'} mt={'10px'} />
    </>
    if (!recipe) return <>
      <Flex>
        <Skeleton width={250} height={250} />
        <Flex direction={'column'} ml={'15px'}>
          <Skeleton width={'300px'} height={'40px'} />
          <Skeleton width={'250px'} height={'30px'} mt={'10px'} />
          <Spacer />
          <Skeleton width={'200px'} height={'30px'} />
        </Flex>
      </Flex>
      <Flex mt={'15px'}>
        <Flex direction={'column'}>
          {SkeletonList}
        </Flex>
        <Flex direction={'column'} ml={'25px'}>
          {SkeletonList}
        </Flex>
      </Flex>
    </>

    return <>
      <Flex>
        <Box rounded={'md'} overflow={'hidden'}>
          <Image src={recipe.imageUrl} width={250} height={250} objectFit={'cover'} objectPosition={'center'} />
        </Box>
        <Flex direction={'column'} ml={'15px'}>
          <Text fontSize={'3xl'}>{recipe.name}</Text>
          <Flex align={'center'}>
            <Text fontSize={'xl'}>{totalTime} min</Text>
            <TimeIcon mx={'6px'} />
          </Flex>
          <Spacer />
          <Link href={recipe.originalUrl} isExternal>Source <ExternalLinkIcon mx='2px' /></Link>
        </Flex>
      </Flex>
      <Flex mt={'15px'}>
        <Flex direction={'column'}>
          <Text fontSize={'lg'}>Steps</Text>
          <List>
            <ListHeader>Step</ListHeader>
            <ListHeader align={'right'}>Time</ListHeader>
            {recipe.steps.map((step, index) => <React.Fragment key={index}>
              <Text>{index+1}. {step}</Text>
              <Text align={'right'}>{renderTime(recipe.timers[index])}</Text></React.Fragment>
            )}
          </List>
        </Flex>
        <Flex direction={'column'} ml={'25px'}>
          <Text fontSize={'lg'}>Ingredients</Text>
          <List templateColumns={'1fr repeat(2, auto)'}>
            <ListHeader>Ingredient</ListHeader>
            <ListHeader>Type</ListHeader>
            <ListHeader align={'right'}>Qty</ListHeader>
            {recipe.ingredients.map(ingredient => <React.Fragment key={ingredient.name}>
              <Text>{ingredient.name}</Text>
              <Text>{ingredient.type}</Text>
              <Text align={'right'}>{ingredient.quantity}</Text>
            </React.Fragment>)}
          </List>
        </Flex>
      </Flex>
    </>
  }

  return <Flex direction={'column'} align={'center'}>
    <Flex direction={'column'} width={940}>
    {renderContent()}
    </Flex>
  </Flex>
}

export default RecipeView
