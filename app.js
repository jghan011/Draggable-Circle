const { ReactDraggable: Draggable, React, ReactDOM } = window;

class App extends React.Component {
  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  render() {
    const { deltaPosition } = this.state;

    return (
      <div>
        <Draggable onDrag={this.handleDrag}>
          <div id="circle">
            <div class="centeredX1">
              X<input type="number" value={deltaPosition.x.toFixed(0)}></input>
            </div>
            <div class="centeredX2">
              Y
              <span>
                <input type="number" value={deltaPosition.y.toFixed(0)}></input>
              </span>
            </div>
          </div>
        </Draggable>
        <Draggable onDrag={this.handleDrag}>
          <div id="circle2"></div>
        </Draggable>
        <Draggable onDrag={this.handleDrag}>
          <div className="drag-box">
            <div>I am ready to be Dragged!!!</div>
          </div>
        </Draggable>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
