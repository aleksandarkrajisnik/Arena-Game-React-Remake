import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import Button from "./components/Button";
import Square from "./components/Square";
import './Game.scss'
import ArenaLogo from '../../../../assets/img/ArenaCloudLogo.svg'

const Game = ({incrementStep, userBall}) => {

    const [squares, setSquares] = useState(Array(9).fill(""));
    const [turn, setTurn] = useState("x");
    const [winner, setWinner] = useState(null);
    const [blockClick, setBlockClick] = useState(false);

    const availableSquares = useMemo(() => {
        const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

        return indexOfAll(squares, '');
    }, [squares])

    const checkEndTheGame = () => {
        for (let square of squares) {
            if (!square) return false;
        }
        return true;
    };

    const checkWinner = () => {
        const combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of combos) {
            const [a, b, c] = combo;
            
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const playerMove = (ind) => {
        if (squares[ind] || winner) {
            return;
        }
        const s = [...squares];
        s[ind] = turn;
        setSquares(s);
        setTurn(turn === "x" ? "o" : "x");
        setBlockClick(true);
    };

    const computerMove = () => {

        const ind = availableSquares[Math.floor(Math.random() * availableSquares.length)];

        if (squares[ind] || winner) {
            return;
        }
        const s = [...squares];
        s[ind] = turn;
        setSquares(s);

        setTurn(turn === "x" ? "o" : "x");
        setBlockClick(false)
    }

    const resetGame = () => {
        setSquares(Array(9).fill(""));
        setTurn("x");
        setWinner(null);
    };

    useEffect(() => {
        const W = checkWinner();
        if (W) {
            setWinner(W);
        } else if (checkEndTheGame()) {
            setWinner("x | o");
        }
    }, [squares])

    useEffect(() => {
        if((squares.includes('x') || squares.includes('o')) && turn === 'o'){
            setTimeout(() => {computerMove()}, 1500)
            //computerMove()
        }
    }, [turn])

    return (
        <div className="tic-tac-toe">
            <div className="game">
                {Array.from("012345678").map((ind) => (
                    <Square
                        key={ind}
                        ind={ind}
                        updateSquares={blockClick ? null : playerMove}
                        clsName={
                            `${squares[ind]} 
                            ${squares[ind] === 'x' && userBall === 'basketball' && 'basketball'}
                            ${squares[ind] === 'o' && userBall === 'basketball' && 'football'}
                            `
                        }
                    />
                ))}
            </div>
            <div className={`turn ${turn === "x" ? "left" : "right"}`}>
                <Square clsName={`x ${userBall === 'basketball' ? 'basketball' : 'football'}`} />
                <Square clsName={`o ${userBall === 'basketball' ? 'football' : 'basketball'}`} />
            </div>
            <AnimatePresence>
                {winner && (
                    <motion.div
                        key={"parent-box"}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="winner"
                    >
                        <motion.div
                            key={"child-box"}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            className="text"
                        >
                            <motion.h2
                                initial={{ scale: 0, y: 100 }}
                                animate={{
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        y: { delay: 0.7 },
                                        duration: 0.7,
                                    },
                                }}
                            >
                                {winner === "x | o" || winner === 'o' ? "Niste uspeli da pobedite računar 😢." : 'Čestitamo 😁! Osvojili ste nagradu!'}
                            </motion.h2>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: {
                                        delay: 1.3,
                                        duration: 0.2,
                                    },
                                }}
                                className="win"
                            >
                                <img
                                    className='logo'
                                    src={ArenaLogo}
                                    style={{ width: 170 }}
                                    alt="website logo"
                                />
                                {/* {winner === 'x | o' && <>
                                        <Square clsName={`x ${userBall === 'basketball' ? 'basketball' : 'football'}`} />
                                        <Square clsName={`o ${userBall === 'basketball' ? 'football' : 'basketball'}`} />
                                    </>} */}
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{
                                    scale: 1,
                                    transition: { delay: 1.5, duration: 0.3 },
                                }}
                            >
                                <button onClick={() => resetGame()}>
                                    {winner === 'x | o' || winner === 'o' ? 'Pokušaj ponovo' : "Preuzmi nagradu"}
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Game;