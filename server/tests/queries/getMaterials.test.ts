import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from '../../schema';

describe('머테리얼 쿼리', () => {
  it('모든 사료데이터를 가져와야 한다', async () => {
    const server: any = new ApolloServer({ schema });
    //스키마를 주입하여 가짜 GraphQl서버 생성

    const { query } = createTestClient(server);

    const res = await query({
      query: gql`
        query GetMaterials {
          materials {
            id
            archivist
            material {
              id
              title
              description
              picture
              createdAt
              keyword
              materialType {
                id
                typeName
              }
              identificationNum
            }
          }
        }
      `,
    });

    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
    expect(res.data).toMatchSnapshot();
  });
});
