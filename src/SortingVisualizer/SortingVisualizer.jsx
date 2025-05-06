import React from "react";
import './SortingVisualizer.css';
import { mergeSort } from "../SortingAlgorithms/SortingAlgorithms";

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < 250; i++) {
            array.push(randomIntFromInterval(5, 100));
        }
        this.setState({array});
    }

    quickSort() {

    }

    mergeSort() {

        const sortedArray = mergeSort(this.state.array);
        const javaScriptSort = this.state.array.slice().sort(function(a, b){return a - b});

        console.log(arraysAreEqual(sortedArray, javaScriptSort));

    }

    bubbleSort() {

    }

    selectionSort() {

    }



    render() {
        const {array} = this.state;

        return (
            <div className="visualizer-wrapper">
              <div className="button-container">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
              </div>
              <div className="array-container">
                {array.map((value, idx) => (
                  <div
                    className="arrayBar"
                    key={idx}
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
            </div>
          );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(jsArray, myArray) {
    if (jsArray.length !== myArray.length) {
        return false;
    }
    for (let i = 0; i < jsArray.length; i++) {
        if (jsArray[i] !== myArray[i]) {
            return false;
        }
    }
    return true;

}
