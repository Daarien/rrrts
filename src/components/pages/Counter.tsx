import React, { MouseEventHandler, RefObject } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Button } from 'reactstrap';
import { counter, ReduxState } from '../../store';

type Props = {
  count: number;
  increment: (n?: number) => void;
  decrement: (n?: number) => void;
  reset: () => void;
}

type Handler = MouseEventHandler<HTMLButtonElement>;

class Counter extends React.Component<Props> {
  input: RefObject<HTMLInputElement> = React.createRef();

  handleIncrement: Handler = () => this.props.increment();

  handleIncrementBy: Handler = () => {
    const { value }= this.input.current!;
    if (value !== '0')
      this.props.increment(parseInt(value));
  }

  handleDecrement: Handler = () => this.props.decrement();
  render() {
    return (
      <Container>
        <h1>Counter</h1>

        <p>This is a simple example of a React & Redux component !!!</p>

        <p>Current count: <strong>{this.props.count}</strong></p>

        <Row className='mb-2'>
          <Button color='info' onClick={this.handleIncrement} className='mr-2'>Increment</Button>
          <Button color='primary' onClick={this.handleDecrement} className='mr-2'>Decrement</Button>
        </Row>
        <Row className='mb-2'>
          <Button color='info' onClick={this.handleIncrementBy} className='mr-2'>Increment by</Button>
          <input type='number' ref={this.input} defaultValue='1' />
        </Row>
        <Row>
          <Button onClick={this.props.reset}>Reset</Button>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  count: state.counter.count
});

export default connect(mapStateToProps, counter.dispatcher)(Counter);