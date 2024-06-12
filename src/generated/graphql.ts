import { GraphQLClient } from 'graphql-request';
import * as Dom from 'graphql-request/dist/types.dom';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['ID'];
  countries: Array<Country>;
  name: Scalars['String'];
};

export type ContinentFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Country = {
  __typename?: 'Country';
  awsRegion: Scalars['String'];
  capital?: Maybe<Scalars['String']>;
  code: Scalars['ID'];
  continent: Continent;
  currencies: Array<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  emoji: Scalars['String'];
  emojiU: Scalars['String'];
  languages: Array<Language>;
  name: Scalars['String'];
  native: Scalars['String'];
  phone: Scalars['String'];
  phones: Array<Scalars['String']>;
  states: Array<State>;
  subdivisions: Array<Subdivision>;
};


export type CountryNameArgs = {
  lang?: InputMaybe<Scalars['String']>;
};

export type CountryFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
  continent?: InputMaybe<StringQueryOperatorInput>;
  currency?: InputMaybe<StringQueryOperatorInput>;
  name?: InputMaybe<StringQueryOperatorInput>;
};

export type Language = {
  __typename?: 'Language';
  code: Scalars['ID'];
  name: Scalars['String'];
  native: Scalars['String'];
  rtl: Scalars['Boolean'];
};

export type LanguageFilterInput = {
  code?: InputMaybe<StringQueryOperatorInput>;
};

export type Query = {
  __typename?: 'Query';
  continent?: Maybe<Continent>;
  continents: Array<Continent>;
  countries: Array<Country>;
  country?: Maybe<Country>;
  language?: Maybe<Language>;
  languages: Array<Language>;
};


export type QueryContinentArgs = {
  code: Scalars['ID'];
};


export type QueryContinentsArgs = {
  filter?: InputMaybe<ContinentFilterInput>;
};


export type QueryCountriesArgs = {
  filter?: InputMaybe<CountryFilterInput>;
};


export type QueryCountryArgs = {
  code: Scalars['ID'];
};


export type QueryLanguageArgs = {
  code: Scalars['ID'];
};


export type QueryLanguagesArgs = {
  filter?: InputMaybe<LanguageFilterInput>;
};

export type State = {
  __typename?: 'State';
  code?: Maybe<Scalars['String']>;
  country: Country;
  name: Scalars['String'];
};

export type StringQueryOperatorInput = {
  eq?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  ne?: InputMaybe<Scalars['String']>;
  nin?: InputMaybe<Array<Scalars['String']>>;
  regex?: InputMaybe<Scalars['String']>;
};

export type Subdivision = {
  __typename?: 'Subdivision';
  code: Scalars['ID'];
  emoji?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type GetCountryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCountryQuery = { __typename?: 'Query', countries: Array<{ __typename?: 'Country', name: string, native: string, code: string, capital?: string | null, emoji: string, currency?: string | null, continent: { __typename?: 'Continent', code: string, name: string }, languages: Array<{ __typename?: 'Language', code: string, name: string }> }> };

export type GetCountryByNameQueryVariables = Exact<{
  name: Scalars['ID'];
}>;


export type GetCountryByNameQuery = { __typename?: 'Query', country?: { __typename?: 'Country', name: string, native: string, capital?: string | null, emoji: string, currency?: string | null, continent: { __typename?: 'Continent', code: string, name: string }, languages: Array<{ __typename?: 'Language', code: string, name: string }> } | null };


export const GetCountryDocument = gql`
    query getCountry {
  countries {
    name
    native
    continent {
      code
      name
    }
    code
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
    `;
export const GetCountryByNameDocument = gql`
    query getCountryByName($name: ID!) {
  country(code: $name) {
    name
    native
    continent {
      code
      name
    }
    capital
    emoji
    currency
    languages {
      code
      name
    }
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getCountry(variables?: GetCountryQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCountryQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCountryQuery>(GetCountryDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCountry', 'query');
    },
    getCountryByName(variables: GetCountryByNameQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetCountryByNameQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetCountryByNameQuery>(GetCountryByNameDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getCountryByName', 'query');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;