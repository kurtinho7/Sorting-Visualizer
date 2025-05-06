import React from "react";
import './SortingVisualizer.css';
import { mergeSort, selectionSort } from "../SortingAlgorithms/SortingAlgorithms";

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
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({array});
    }

    quickSort() {

    }

    // Inspired by https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial
    mergeSort() {
        const animations = mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName("arrayBar");
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneId, barTwoId] = animations[i];
                const barOneStyle = arrayBars[barOneId].style;
                const barTwoStyle = arrayBars[barTwoId].style;
                const color = i % 3 === 0 ? 'red' : 'turquoise';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * 3);
            } else {
                setTimeout(() => {
                    const [barOneId, barTwoHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneId].style;
                    barOneStyle.height = `${barTwoHeight}px`;

                }, i * 3);
            }
        }
    }

    bubbleSort() {

    }

    selectionSort() {
        const animations = selectionSort(this.state.array.slice());
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
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'red';
                }, i * 1);

                setTimeout(() => {
                    barOneStyle.backgroundColor = 'turquoise';
                    barTwoStyle.backgroundColor = 'turquoise';
                }, (i + 1) * 1);


            } else if (hasChangeMin) {
                const [barOneId, barTwoId] = animation.minChange;
                const barTwoStyle = arrayBars[barTwoId].style;
                setTimeout(() => {
                    barTwoStyle.backgroundColor = 'gold';
                }, i * 5);

                setTimeout(() => {
                    barTwoStyle.backgroundColor = 'turquoise';
                }, (i + 1) * 5);

            } else if (hasSwap) {
                setTimeout(() => {
                    const [barOneId, barTwoId] = animation.swap;
                    const barOneStyle = arrayBars[barOneId].style;
                    const barTwoStyle = arrayBars[barTwoId].style;
                    const tempHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = tempHeight;

                }, i * 1);
            }
        }

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
                    style={{ height: `${value}px` }}
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
