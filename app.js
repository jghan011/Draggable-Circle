const { ReactDraggable: Draggable, React, ReactDOM } = window;

class App extends React.Component {
  state = {
    activeDrags: 0,
    circleOne: {
      x: 0,
      y: 0,
    },
    circleTwo: {
      x: 400,
      y: 400,
    },
  }; //these states keep track of each time you move so after you move itx and y change

  handleDragCircleOne = (e, ui) => {
    const { x, y } = this.state.circleOne;
    this.setState({
      circleOne: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  handleDragCircleTwo = (e, ui) => {
    const { x, y } = this.state.circleTwo;
    this.setState({
      circleTwo: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
  };

  handleChange = (event) => {
    // console.log(event);
    // console.log(this);
    this.setState(() => ({
      circleOne: {
        ...this.state.circleOne,
        x: " ",
      },
    }));
    console.log(event);
    // console.log("hello");
  };
  // handleChange = (event) => {
  //   this.setState({
  //     circleOne: event.target.value,
  //   });
  // };

  render() {
    const { circleOne } = this.state;
    const { circleTwo } = this.state;
    console.log(circleOne);
    console.log(circleTwo);

    return (
      <div>
        <Draggable onDrag={this.handleDragCircleOne}>
          <div id="circle" style={{ color: "red" }}>
            <div class="centeredX1">
              X
              <input
                type="number"
                value={circleOne.x.toFixed(0)}
                onClick={this.handleChange}
                // oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              ></input>
            </div>
            <div class="centeredY1">
              Y
              <span>
                <input type="number" value={circleOne.y.toFixed(0)}></input>
              </span>
            </div>
          </div>
        </Draggable>
        <Draggable onDrag={this.handleDragCircleTwo}>
          <div id="circle2">
            <div class="centeredX2">
              X<input type="number" value={circleTwo.x.toFixed(0)}></input>
            </div>
            <div class="centeredY2">
              y<input type="number" value={circleTwo.y.toFixed(0)}></input>
            </div>
          </div>
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
