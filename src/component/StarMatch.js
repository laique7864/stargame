
import React, { useState, useEffect } from 'react';
import { utils } from './Utils';
import { colors } from './Utils';
import './StarMatch.css'
import { Star } from './Star';
import { PlayNumber } from './PlayNumber';
import { PlayAgain } from './PlayAgain';
export const StarMatch = () => {
  const [stars, setStars] = useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = useState([])

  const candidatesAreWrong = utils.sum(candidateNums) > stars;//expression

  const [counter, setCounter] = useState(10);
  const gameStatus = availableNums.length === 0 ? 'done' : (counter === 0 ? 'lost' : 'active'); //expression
  const onNumberChange = (number, currentStatus) => {
    if (gameStatus != 'active' || currentStatus === "used") {
      return;
    }

    const newCandidateNums =
      currentStatus === 'available'
        ? candidateNums.concat(number)
        : candidateNums.filter(cn => cn !== number);

    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter(
        n => !newCandidateNums.includes(n)
      );
      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  }


  const statusChange = (item) => {

    if (!availableNums.includes(item)) {
      return "used"
    }
    if (candidateNums.includes(item)) {
      return candidatesAreWrong ? "wrong" : "candidate"
    }
    return "available"

  }
  const resetGame = () => {
    setStars(utils.random(1, 9));
    setAvailableNums(utils.range(1, 9));
    setCandidateNums([]);
    setCounter(10)
  }
  useEffect(() => {
    console.log("Use Effect");
    if (counter > 0) {
      const timer = setTimeout(() => {
        setCounter(counter - 1);
      }, 1000);
      return (() => {
        console.log("the component is unmounted");
        clearTimeout(timer)
      })
    }
  }, [counter])

  useEffect(() => {
    console.log("Second useffect candidate");
  }, [candidateNums])
  // const fetchData = () => setAvailableNums{
  //   console.log("Second useffect available");
  //   const resp = axios.get("www.fakr.com/q=" + searchText)
  //   setApiData(resp.data)
  // }
  // useEffect(() => {
  //   fetchData();
  // }, [searchText])


  return (
    <div className="game">
      <div className="help">
        Pick 1 or more numbers that sum to the number of stars
      </div>
      <div className="body">
        <div className="left">
          {gameStatus != 'active' ?
            <PlayAgain resetGame={resetGame} gameStatus={gameStatus}></PlayAgain>
            : <Star stars={stars} />
          }
        </div>
        <div className="right">
          {utils.range(1, 9).map((item, index) => {
            return (


              <PlayNumber key={item}
                onNumberClick={onNumberChange}
                status={statusChange(item)}
                item={item} />


            )
          })}

        </div>
      </div>
      <div className="timer">Time Remaining: {counter}</div>
    </div>
  );
};

// Color Theme


