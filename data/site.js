import useSWR, { trigger, mutate } from 'swr';
import { graphql } from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (id, token) => {
  const query = `
    query Site(
      $id: String
    ) {
      site(id: $id) {
        id
        name
        deployKey
        forms(first: 100) {
          edges {
            node {
              id
              name
              key
              submissionCount
            }
          }
        }
      }
    }
  `;

  if (!token) return { status: 'unauthorized' };

  try {
    const resp = await graphql(query, { id }, token);

    if (resp.status === 401) return { status: 'unauthorized', id };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError', id };
    if (resp.status >= 500) return { status: 'serverError', id };

    const {
      data: { site }
    } = await resp.json();

    if (!site) return { status: 'notFound', id };
    return { status: 'ok', site, id };
  } catch (e) {
    return { status: 'serverError', id };
  }
};

export const revalidate = id => {
  const token = getToken();
  trigger(['site', id, token]);
};

export const setInitialState = (id, data) => {
  const token = getToken();
  mutate(['site', id, token], data, false);
};

export const useSiteData = (id, config = {}) => {
  const token = getToken();

  const { data, ...rest } = useSWR(
    ['site', id, token],
    async (_, id, token) => await fetch(id, token),
    config
  );

  return { siteData: data, ...rest };
};
