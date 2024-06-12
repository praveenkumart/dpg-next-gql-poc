import { dehydrate, useQuery } from "react-query";
import Head from "next/head";
import Link from "next/link";
import { Grid, Card, Image, Text, Title } from "@mantine/core";

import { queryClient, getCountry } from "../api";

export async function getServerSideProps() {
  await queryClient.prefetchQuery(["country"], () => getCountry());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const { data } = useQuery(["country"], () => getCountry());
  return (
    <div>
      <Grid>
        {data?.countries.map((f, i) => (
          <Grid.Col xs={12} md={6} lg={4} key={`${f.name}:${i}`} p={5}>
          <Link href={`/country/${f.code}`} passHref>
            <Card component="a" style={{ textDecoration: 'none' }}>
              <Card.Section>
                <Title order={3}>{f.name} ({f.code})  {f.emoji}</Title>
              </Card.Section>
              <Text size="sm">
                <strong>Capital:</strong> {f.capital}
              </Text>
              <Text size="sm">
                <strong>Continent:</strong> {f.continent.name}
              </Text>
              <Text size="sm">
                <strong>Currency:</strong> {f.currency}
              </Text>
              <Text size="sm">
                <strong>Languages:</strong> {f.languages.map(lang => lang.name).join(', ')}
              </Text>
              <Text size="sm">
                <strong>Native Name:</strong> {f.native}
              </Text>
            </Card>
          </Link>
        </Grid.Col>
        ))}
      </Grid>
    </div>
  );
}
