import React from 'react';
import {Image, HStack, Text, Flex, Link, Spacer} from '@chakra-ui/react';
import {ExternalLinkIcon, TimeIcon} from '@chakra-ui/icons';
import {useNavigate} from 'react-router-dom';
import {combinePaths, NAV_PATHS} from 'helpers/navigation.helper';
import {Recipe} from 'types/recipe.type';

const SLICE_INGREDIENTS = 3

type RecipeCard = {
  recipe: Recipe
}

const RecipeCard: React.FC<RecipeCard> = ({recipe}) => {
  const navigate = useNavigate()

  const totalTime = recipe.timers.reduce((prev, curr) => prev + curr, 0)
  const ingredients = recipe.ingredients.map(i => i.name)
  const andMore = ingredients.length > SLICE_INGREDIENTS ? `and ${ingredients.length - SLICE_INGREDIENTS} more…` : ''

  const onClick = () => {
    navigate(combinePaths(NAV_PATHS.recipe, recipe._id))
  }

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation()

  return <Flex onClick={onClick} cursor={'pointer'} direction={'column'} height={450} width={300} border={'1px'} borderColor={'gray.200'} rounded={'md'} padding={4}>
    <Image src={recipe.imageUrl} width={270} height={270} objectFit={'cover'} objectPosition={'center'} style={{background: 'gray'}} />
    <Text fontSize={'xl'} style={{paddingTop: '5px', fontWeight: '500'}}>{recipe.name}</Text>
     <Text maxHeight={'70px'}>{ingredients.slice(0, SLICE_INGREDIENTS).join(', ')} {andMore}</Text>
    <Spacer />
    <Flex>
        <Link onClick={stopPropagation} href={recipe.originalUrl} isExternal>Source <ExternalLinkIcon mx='2px' /></Link>
      <Spacer/>
      <HStack>
        <Text>{totalTime}</Text>
        <TimeIcon />
      </HStack>
    </Flex>
  </Flex>
}

export default React.memo(RecipeCard)
