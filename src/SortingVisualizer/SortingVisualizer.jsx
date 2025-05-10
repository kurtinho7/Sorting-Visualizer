import React from "react";
import './SortingVisualizer.css';
import { heapSort, mergeSort, quickSort, selectionSort } from "../SortingAlgorithms/SortingAlgorithms";

export class SortingVisualizer extends React.Component {
    isSorting;
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
        this.isSorting = false;

    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        if (this.isSorting) {
            return;
        }
        const array = [];
        for (let i = 0; i < 250; i++) {
            array.push(randomIntFromInterval(5, 700));
        }
        this.setState({array});
        const arrayBars = document.getElementsByClassName("arrayBar");
            for (let j = 0; j < arrayBars.length ; j++) {
                const barStyle = arrayBars[j].style;
                barStyle.backgroundColor = 'turquoise';
        }
    }   

    quickSort() {
        if (this.isSorting) {
            return;
        }
        const newArray = this.state.array.slice()
        const animations = quickSort(newArray);
        const SPEED = 10;
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
                    pivotStyle.backgroundColor = 'green';
                }, t);
            }
            if (hasCompare) {
                setTimeout(() => {
                    const [startIdx, endIdx] = animation.compare;
                    for (let i = startIdx; i <= endIdx; i++) {
                        const barStyle = arrayBars[i].style;
                        barStyle.backgroundColor = 'red';
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
                    barTwoStyle.backgroundColor = 'turquoise';


                }, t);
            }
            if (hasEndCompare) {
                setTimeout(() => {
                    const [startIdx, endIdx] = animation.endCompare;
                    for (let k = startIdx; k <= endIdx; k++) {
                        const barStyle = arrayBars[k].style;
                        barStyle.backgroundColor = 'turquoise';
                    }

                }, t);

            }

        }

        setTimeout(() => {
            const arrayBars = document.getElementsByClassName("arrayBar");
            for (let j = 0; j < arrayBars.length ; j++) {
                setTimeout(() => {
                    const barStyle = arrayBars[j].style;
                    barStyle.backgroundColor = 'gold';
                }, j * 3);
            }


        }, animations.length * SPEED + 1);

        setTimeout(() => {
            this.isSorting = false;
            this.setState({ array: newArray});
        }, animations.length * (SPEED) + animations.length);

        


    }

    // Inspired by https://github.com/clementmihailescu/Sorting-Visualizer-Tutorial
    mergeSort() {
        if (this.isSorting) {
            return;
        }

        this.isSorting = true;
        const newArray = this.state.array.slice();
        const animations = mergeSort(newArray);
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

        setTimeout(() => {
            const arrayBars = document.getElementsByClassName("arrayBar");
            for (let j = 0; j < arrayBars.length ; j++) {
                setTimeout(() => {
                    const barStyle = arrayBars[j].style;
                    barStyle.backgroundColor = 'gold';
                }, j * 3);
            }
        }, animations.length * 3 + 1);

        setTimeout(() => {
            this.isSorting = false;
            this.setState({ array: newArray});

        }, animations.length * (3) + this.state.array.slice().length + 1);
    }

    heapSort() {
        if (this.isSorting) {
            return;
        }
        this.isSorting = true;
        const newArray = this.state.array.slice();
        const SPEED = 3;
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
                    barOneStyle.backgroundColor = 'red';
                    barTwoStyle.backgroundColor = 'red';
                }, i * SPEED);

                setTimeout(() => {
                    barOneStyle.backgroundColor = 'turquoise';
                    barTwoStyle.backgroundColor = 'turquoise';
                }, (i + 1) * SPEED);

            }

            if (hasSwap){
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
            for (let j = 0; j < arrayBars.length ; j++) {
                setTimeout(() => {
                    const barStyle = arrayBars[j].style;
                    barStyle.backgroundColor = 'gold';
                }, j * 3);
            }
        }, animations.length * SPEED + 1);

        setTimeout(() => {
            this.isSorting = false;
            this.setState({ array: newArray});
        }, animations.length * SPEED + this.state.array.slice().length * 3);


    }

    selectionSort() {
        if (this.isSorting) {
            return;
        }
        this.isSorting = true;
        const newArray = this.state.array.slice();
        const animations = selectionSort(newArray);
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

        setTimeout(() => {
            const arrayBars = document.getElementsByClassName("arrayBar");
            for (let j = 0; j < arrayBars.length ; j++) {
                setTimeout(() => {
                    const barStyle = arrayBars[j].style;
                    barStyle.backgroundColor = 'gold';
                }, j * 3);
            }
        }, animations.length * 1 + 1);

        setTimeout(() => {
            this.isSorting = false;
            this.setState({ array: newArray});
        }, animations.length + this.state.array.slice().length * 3);

    }



    render() {
        const {array} = this.state;

        return (
            <div className="visualizer-wrapper">
              <div className="button-container">
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
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
