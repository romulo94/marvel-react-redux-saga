import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import InfiniteScroll from 'react-infinite-scroll-component';
import { ButtonBase } from '@material-ui/core';
import { Creators as ComicActions } from '../../store/ducks/comics';
import { Creators as ModalActions } from '../../store/ducks/modal';

import CardItem from './components/CardItem';

import { Container } from './styles';

class List extends Component {
  static propTypes = {
    showModal: PropTypes.func.isRequired,
    addComicsRequest: PropTypes.func.isRequired,
    comics: PropTypes.shape({}).isRequired,
  };

  componentDidMount() {
    this.loadComics();
  }

  openModal = (id) => {
    const { showModal } = this.props;
    showModal(id);
  };

  loadComics = () => {
    const { addComicsRequest } = this.props;
    addComicsRequest();
  };

  render() {
    const {
      comics: { data },
    } = this.props;
    return (
      <>
        <Container>
          {data.length ? (
            <InfiniteScroll
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                margin: '40px',
              }}
              dataLength={data.length}
              next={() => this.loadComics()}
              hasMore
              loader={<h4 style={{ color: 'white' }}>Loading...</h4>}
            >
              {data.map(item => (
                <ButtonBase onClick={() => this.openModal(item.id)} key={item.id}>
                  <CardItem data={item} />
                </ButtonBase>
              ))}
            </InfiniteScroll>
          ) : (
            <h1 style={{ color: 'white' }}>vazio</h1>
          )}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  comics: state.comics,
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    ...ComicActions,
    ...ModalActions,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(List);
