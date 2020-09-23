const { ReactDraggable: Draggable, React, ReactDOM } = window;

class App extends React.Component {
  state = {
    activeDrags: 0,
    circleOne: {
      x: 0,
      y: 0,
    },
    circleTwo: {
      x: 0,
      y: 0,
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

  handleCircleOneChange = (event, cardinalDirection) => {
    console.log(event);
    let input = event.target.value;
    console.log({ input });
    this.setState({
      ...this.state,
      circleOne: {
        ...this.state.circleOne,
        [cardinalDirection]: Number(input),
      },
    });
  };

  handleCircleTwoChange = (event, cardinalDirection) => {
    console.log(event);
    let input = event.target.value;
    console.log({ input });
    this.setState({
      ...this.state,
      circleTwo: {
        ...this.state.circleTwo, // {x: 2, y: 4}
        [cardinalDirection]: Number(input), //
      },
    });
  };

  onStart = () => {
    this.setState({ activeDrags: ++this.state.activeDrags });
  };

  onStop = () => {
    this.setState({ activeDrags: --this.state.activeDrags });
  };

  onControlledDrag = (e, position, circle) => {
    const { x, y } = position;
    this.setState((state) => ({
      ...state,
      [circle]: { x, y },
    }));
  };

  onControlledDragStop = (e, position, circle) => {
    this.onControlledDrag(e, position, circle);
    this.onStop();
  };

  createLine(x1, y1, x2, y2) {
    // the distance between the tow points(for the line div width)
    distance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));

    // the mid-point between the two points, we use it as rotation center
    xMid = (x1 + x2) / 2;
    yMid = (y1 + y2) / 2;

    //get the salop of the line between the two points

    let slopeinRadian = Math.atan2(y1 - y2, x1 - x2);
    let slopeInDegree = (slopeinRadian * 180) / Math.PI;

    //Change the css of the line

    const line = {
      width: distance + "px",
      top: yMid + "px",
      left: xMid - distance / 2 + "px",
      transform: "rotate(" + slopeInDegree + "deg)",
    };
  }

  render() {
    const { circleOne } = this.state;
    const { circleTwo } = this.state;
    // console.log(circleOne);
    // console.log(circleTwo);
    const draggableProps = { onStart: this.onStart, onStop: this.onStop };
    const { x: circleOneX, y: circleOneY } = this.state.circleOne;
    const { x: circleTwoX, y: circleTwoY } = this.state.circleTwo;
    return (
      <div>
        <Draggable
          {...draggableProps}
          position={{ x: circleOneX, y: circleOneY }}
          onDrag={(e, position) =>
            this.onControlledDrag(e, position, "circleOne")
          }
          onStop={(e, position) =>
            this.onControlledDragStop(e, position, "circleOne")
          }
        >
          <div id="circle" style={{ color: "red" }}>
            <div className="centeredX1">
              X
              <input
                type="number"
                value={circleOne.x.toFixed(0)}
                onChange={(e) => this.handleCircleOneChange(e, "x")}
                // onClick={this.handleClick}
                // oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
              />
            </div>
            <div className="centeredY1">
              Y
              <span>
                <input
                  type="number"
                  onChange={(e) => this.handleCircleOneChange(e, "y")}
                  value={circleOne.y.toFixed(0)}
                ></input>
              </span>
            </div>
          </div>
        </Draggable>
        <Draggable
          {...draggableProps}
          position={{ x: circleTwoX, y: circleTwoY }}
          onDrag={(e, position) =>
            this.onControlledDrag(e, position, "circleTwo")
          }
          onStop={(e, position) =>
            this.onControlledDragStop(e, position, "circleTwo")
          }
        >
          <div id="circle2">
            <div className="centeredX2">
              X
              <input
                type="number"
                onChange={(e) => this.handleCircleTwoChange(e, "x")}
                value={circleTwo.x.toFixed(0)}
              ></input>
            </div>
            <div className="centeredY2">
              y
              <input
                type="number"
                onChange={(e) => this.handleCircleTwoChange(e, "y")}
                value={circleTwo.y.toFixed(0)}
              ></input>
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
