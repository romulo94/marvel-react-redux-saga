import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ButtonBase } from '@material-ui/core';
import api from '../../services/api';
import { publicKey, hash, ts } from '../../config/config';
import CardItem from '../../components/CardItem';

import { Container } from './styles';

export default class Main extends Component {
  state = {
    comics: [],
    limit: 50,
    offset: 0,
  };

  componentDidMount() {
    this.loadComics();
  }

  loadComics = async () => {
    const { offset, comics, limit } = this.state;
    try {
      const {
        data: { data },
      } = await api.get(
        `/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&offset=${offset}&limit=${limit}`,
      );

      this.setState({ comics: [...comics, ...data.results], offset: offset + limit });
    } catch (error) {
      alert('Ocorreu um erro inesperado');
    }
  };

  render() {
    const { comics } = this.state;
    return (
      <Container>
        {comics.length ? (
          <InfiniteScroll
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              margin: '40px',
            }}
            dataLength={comics.length}
            next={() => this.loadComics()}
            hasMore
            loader={<h4 style={{ color: 'white' }}>Loading...</h4>}
          >
            {comics.map(item => (
              <ButtonBase onClick={() => {}} key={item.id}>
                <CardItem data={item} />
              </ButtonBase>
            ))}
          </InfiniteScroll>
        ) : (
          <h1 style={{ color: 'white' }}>vazio</h1>
        )}
      </Container>
    );
  }
}
