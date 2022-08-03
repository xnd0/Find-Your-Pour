//-------------------//
//----- Home.js -----//
//-------------------//



import React from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const AllWine = () => {
  const { loading, data } = useQuery(QUERY_ME);

  const userData = data?.me || {};

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s wines!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.AllWine?.length
            ? `Viewing ${userData.AllWine.length} saved ${
                userData.AllWine.length === 1 ? 'wine' : 'wines'
              }:`
            : 'You have no saved wines!'}
        </h2>
        <CardColumns>
          {userData.AllWine?.map((wine) => {
            return (
              <Card key={wine.wineId} border="dark">
                {wine.image ? (
                  <Card.Img
                    src={wine.image}
                    alt={`The cover for ${wine.name}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Name>{wine.name}</Card.Name>
                  <p className="small">Vineyard: {wine.vineyard}</p>
                  <Card.Text>{wine.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletewine(wine.wineId)}
                  >
                    Delete this wine!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default AllWine;