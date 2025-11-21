import React from "react";
import "./SortingVisualizer.css";
import { heapSort, mergeSort, quickSort, selectionSort } from "../SortingAlgorithms/SortingAlgorithms";

export class SortingVisualizer extends React.Component {
  isSorting;

  constructor(props) {
    super(props);
    this.state = {
      array: [],
      size: 250,      
      speedMs: 10,    
    };
    this.isSorting = false;
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    if (this.isSorting) return;
    const array = [];
    for (let i = 0; i < this.state.size; i++) {
      array.push(randomIntFromInterval(5, 700));
    }
    this.setState({ array }, () => {
      const arrayBars = document.getElementsByClassName("arrayBar");
      for (let j = 0; j < arrayBars.length; j++) {
        arrayBars[j].style.backgroundColor = "turquoise";
      }
    });
  }

  handleSizeChange = (e) => {
    if (this.isSorting) return;
    const size = Number(e.target.value);
    this.setState({ size }, () => this.resetArray());
  };

  handleSpeedChange = (e) => {
    const speedMs = Number(e.target.value);
    this.setState({ speedMs });
  };

  quickSort() {
    if (this.isSorting) return;

    const newArray = this.state.array.slice();
    const animations = quickSort(newArray);
    const SPEED = this.state.speedMs; 
    this.isSorting = true;

    for (let i = 0; i < animations.length; i++) {
      const t = i * SPEED;

      const arrayBars = document.getElementsByClassName("arrayBar");
      const animation = animations[i];
      const hasPivot = animation.hasOwnProperty("pivot");
      const hasSwap = animation.hasOwnProperty("swap");
      const hasSwapPivot = animation.hasOwnProperty("swapPivot");
      const hasCompare = animation.hasOwnProperty("compare");
      const hasEndCompare = animation.hasOwnProperty("endCompare");

      if (hasPivot) {
        const pivotId = animation.pivot;
        const pivotStyle = arrayBars[pivotId].style;
        setTimeout(() => {
          pivotStyle.backgroundColor = "green";
        }, t);
      }
      if (hasCompare) {
        setTimeout(() => {
          const [startIdx, endIdx] = animation.compare;
          for (let i = startIdx; i <= endIdx; i++) {
            arrayBars[i].style.backgroundColor = "red";
          }
        }, t);
      }
      if (hasSwap) {
        setTimeout(() => {
          const [barOneId, barTwoId] = animation.swap;
          const barOneStyle = arrayBars[barOneId].style;
          const barTwoStyle = arrayBars[barTwoId].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, t);
      }
      if (hasSwapPivot) {
        setTimeout(() => {
          const [barOneId, barTwoId] = animation.swapPivot;
          const barOneStyle = arrayBars[barOneId].style;
          const barTwoStyle = arrayBars[barTwoId].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
          barTwoStyle.backgroundColor = "turquoise";
        }, t);
      }
      if (hasEndCompare) {
        setTimeout(() => {
          const [startIdx, endIdx] = animation.endCompare;
          for (let k = startIdx; k <= endIdx; k++) {
            arrayBars[k].style.backgroundColor = "turquoise";
          }
        }, t);
      }
    }

    // gold sweep
    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("arrayBar");
      for (let j = 0; j < arrayBars.length; j++) {
        setTimeout(() => {
          arrayBars[j].style.backgroundColor = "gold";
        }, j * 3);
      }
    }, animations.length * SPEED + 1);

    setTimeout(() => {
      this.isSorting = false;
      this.setState({ array: newArray });
    }, animations.length * SPEED + animations.length);
  }

  // Inspired by https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial
  mergeSort() {
    if (this.isSorting) return;

    this.isSorting = true;
    const newArray = this.state.array.slice();
    const animations = mergeSort(newArray);
    const SPEED = this.state.speedMs;

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneId, barTwoId] = animations[i];
        const barOneStyle = arrayBars[barOneId].style;
        const barTwoStyle = arrayBars[barTwoId].style;
        const color = i % 3 === 0 ? "red" : "turquoise";
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * SPEED);
      } else {
        setTimeout(() => {
          const [barOneId, barTwoHeight] = animations[i];
          const barOneStyle = arrayBars[barOneId].style;
          barOneStyle.height = `${barTwoHeight}px`;
        }, i * SPEED);
      }
    }

    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("arrayBar");
      for (let j = 0; j < arrayBars.length; j++) {
        setTimeout(() => {
          arrayBars[j].style.backgroundColor = "gold";
        }, j * 3);
      }
    }, animations.length * SPEED + 1);

    setTimeout(() => {
      this.isSorting = false;
      this.setState({ array: newArray });
    }, animations.length * SPEED + this.state.array.slice().length + 1);
  }

  heapSort() {
    if (this.isSorting) return;

    this.isSorting = true;
    const newArray = this.state.array.slice();
    const SPEED = this.state.speedMs; 
    const animations = heapSort(newArray);

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      const animation = animations[i];
      const hasSwap = animation.hasOwnProperty("swap");
      const hasCompare = animation.hasOwnProperty("compare");

      if (hasCompare) {
        const [barOneId, barTwoId] = animation.compare;
        const barOneStyle = arrayBars[barOneId].style;
        const barTwoStyle = arrayBars[barTwoId].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";
        }, i * SPEED);

        setTimeout(() => {
          barOneStyle.backgroundColor = "turquoise";
          barTwoStyle.backgroundColor = "turquoise";
        }, (i + 1) * SPEED);
      }

      if (hasSwap) {
        setTimeout(() => {
          const [barOneId, barTwoId] = animation.swap;
          const barOneStyle = arrayBars[barOneId].style;
          const barTwoStyle = arrayBars[barTwoId].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * SPEED);
      }
    }

    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("arrayBar");
      for (let j = 0; j < arrayBars.length; j++) {
        setTimeout(() => {
          const barStyle = arrayBars[j].style;
          barStyle.backgroundColor = "gold";
        }, j * 3);
      }
    }, animations.length * SPEED + 1);

    setTimeout(() => {
      this.isSorting = false;
      this.setState({ array: newArray });
    }, animations.length * SPEED + this.state.array.slice().length * 3);
  }

  selectionSort() {
    if (this.isSorting) return;

    this.isSorting = true;
    const newArray = this.state.array.slice();
    const animations = selectionSort(newArray);
    const SPEED = this.state.speedMs; // CHANGED

    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      const animation = animations[i];
      const hasComparison = animation.hasOwnProperty("comparison");
      const hasChangeMin = animation.hasOwnProperty("changeMin");
      const hasSwap = animation.hasOwnProperty("swap");

      if (hasComparison) {
        const [barOneId, barTwoId] = animation.comparison;
        const barOneStyle = arrayBars[barOneId].style;
        const barTwoStyle = arrayBars[barTwoId].style;
        setTimeout(() => {
          barOneStyle.backgroundColor = "red";
          barTwoStyle.backgroundColor = "red";
        }, i * SPEED);

        setTimeout(() => {
          barOneStyle.backgroundColor = "turquoise";
          barTwoStyle.backgroundColor = "turquoise";
        }, (i + 1) * SPEED);
      } else if (hasChangeMin) {
        const [barOneId, barTwoId] = animation.minChange;
        const barTwoStyle = arrayBars[barTwoId].style;
        setTimeout(() => {
          barTwoStyle.backgroundColor = "gold";
        }, i * SPEED);

        setTimeout(() => {
          barTwoStyle.backgroundColor = "turquoise";
        }, (i + 1) * SPEED);
      } else if (hasSwap) {
        setTimeout(() => {
          const [barOneId, barTwoId] = animation.swap;
          const barOneStyle = arrayBars[barOneId].style;
          const barTwoStyle = arrayBars[barTwoId].style;
          const tempHeight = barOneStyle.height;
          barOneStyle.height = barTwoStyle.height;
          barTwoStyle.height = tempHeight;
        }, i * SPEED);
      }
    }

    setTimeout(() => {
      const arrayBars = document.getElementsByClassName("arrayBar");
      for (let j = 0; j < arrayBars.length; j++) {
        setTimeout(() => {
          const barStyle = arrayBars[j].style;
          barStyle.backgroundColor = "gold";
        }, j * 3);
      }
    }, animations.length * SPEED + 1);

    setTimeout(() => {
      this.isSorting = false;
      this.setState({ array: newArray });
    }, animations.length * SPEED + this.state.array.slice().length * 3);
  }

  render() {
    const { array, size, speedMs } = this.state;

    // Optional: adapt bar width to size so it fits nicely
    const barWidth = Math.max(2, Math.floor(900 / size)); // tweak as desired

    return (
      <div className="visualizer-wrapper">
        <div className="button-container">
          <button onClick={() => this.resetArray()} disabled={this.isSorting}>Generate New Array</button>
          <button onClick={() => this.quickSort()} disabled={this.isSorting}>Quick Sort</button>
          <button onClick={() => this.mergeSort()} disabled={this.isSorting}>Merge Sort</button>
          <button onClick={() => this.heapSort()} disabled={this.isSorting}>Heap Sort</button>
          <button onClick={() => this.selectionSort()} disabled={this.isSorting}>Selection Sort</button>

          <div style={{ width: "100%", marginTop: "1rem" }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.9 }}>
              Array Size: <strong>{size}</strong>
            </label>
            <input
              type="range"
              min="10"
              max="500"
              step="5"
              value={size}
              onChange={this.handleSizeChange}
              disabled={this.isSorting}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ width: "100%", marginTop: "0.5rem" }}>
            <label style={{ display: "block", fontSize: 12, opacity: 0.9 }}>
              Speed (ms/step): <strong>{speedMs}</strong>
            </label>
            <input
              type="range"
              min="1"
              max="50"
              step="1"
              value={speedMs}
              onChange={this.handleSpeedChange}
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="arrayBar"
              key={idx}
              style={{ height: `${value}px`, width: `${barWidth}px`, margin: "0 1px" }}
            />
          ))}
        </div>
      </div>
    );
  }
}

// utils
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
