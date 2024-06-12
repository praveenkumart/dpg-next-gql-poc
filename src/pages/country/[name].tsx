import React from "react";
import { dehydrate, useQuery } from "react-query";
import { Grid, Card, Image, Text, Title } from "@mantine/core";
import Link from "next/link";

import { queryClient, getCountryByName } from "../../api";

export async function getServerSideProps({ params }:any) {
  await queryClient.prefetchQuery(["country"], () =>
    getCountryByName({ name: params.name })
  );

  return {
    props: {
      name: params.name,
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const CountryDetail: React.FunctionComponent<{
  name: string;
}> = ({ name }) => {
  const { data } = useQuery(["country"], () => getCountryByName({ name }));

  if (!data.country) {
    return <div>No country found</div>;
  }

  return (
    <Grid>
    <Grid.Col xs={12} md={6} lg={4} key={`${data?.country.name}`} p={5}>
    <Link href={`/country/${data?.country.name}`} passHref>
      <Card component="a" style={{ textDecoration: 'none' }}>
        <Card.Section>
          <Title order={3}>{data?.country.name}</Title>
        </Card.Section>
        <Text size="xl">{data?.country.emoji}</Text>
        <Text size="sm">
          <strong>Capital:</strong> {data?.country.capital}
        </Text>
        <Text size="sm">
          <strong>Continent:</strong> {data?.country.continent.name}
        </Text>
        <Text size="sm">
          <strong>Currency:</strong> {data?.country.currency}
        </Text>
        <Text size="sm">
          <strong>Native Name:</strong> {data?.country.native}
        </Text>
      </Card>
    </Link>
  </Grid.Col>
  </Grid>
  );
};

export default CountryDetail;
