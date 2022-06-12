import React from 'react';
import {Breadcrumb, BreadcrumbItem, Flex, Heading, Link} from '@chakra-ui/react'
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import {NavLink} from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Navbar: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  return <Flex direction={'column'} width={'940px'} align={'flex-start'} margin={'15px auto'}>
    <Heading size={'3xl'}>My recipes</Heading>
    <Breadcrumb spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>
      {breadcrumbs.map((b, index, array) => {
        const isCurrentPage = array.length === index + 1;
        return <BreadcrumbItem key={b.match.pathname} isCurrentPage={isCurrentPage}>
          {isCurrentPage ? b.breadcrumb : <Link as={NavLink} to={b.match.pathname}>{b.breadcrumb}</Link>}
        </BreadcrumbItem>
      })}
    </Breadcrumb>
  </Flex>
}

export default Navbar
