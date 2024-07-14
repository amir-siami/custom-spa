/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import Header from "../components/Header";

const collatzLoops = (num: number): number => {
  let count = 0;

  while (num !== 1) {
    if (num % 2 === 0) {
      num = num / 2;
    } else {
      num = 3 * num + 1;
    }
    count++;
  }

  return count;
};

const Collatz = () => {
  const [number, setNumber] = useState<number>(0);
  const [loops, setLoops] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumber(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const loopCount = collatzLoops(number);
    setLoops(loopCount);
  };

  return (
    <div css={styles.container}>
      <Header title="" boldText="Collatz Conjecture" />
      <form onSubmit={handleSubmit} css={styles.form}>
        <h6>Enter your number</h6>
        <input
          type="number"
          value={number}
          onChange={handleChange}
          css={styles.input}
        />
        <div css={styles.submitWrapper}>
          <button type="submit" css={styles.submitButton}>
            Calculate Cycles
          </button>
        </div>
      </form>
      <div css={styles.divider} />

      <div css={styles.boxParent}>
        <span css={styles.h6}>Result</span>

        <div css={styles.boxContainer}>
          <div css={styles.box}>{loops !== null ? loops : "-"}</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: css`
    padding: 20px 0;
    width: 100%;
  `,
  divider: css`
    border-top: 1px solid #ccc;
    margin: 20px 0; /* Add margin for spacing */
  `,
  form: css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    margin-bottom: 20px;
    max-width: 696px;
    margin: 0 auto; /* Center the wrapper */
  `,
  input: css`
    margin-bottom: 10px;
    padding: 30px 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    text-align: center;

    margin-bottom: 1.9rem;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  `,
  submitWrapper: css`
    display: flex;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    overflow: hidden;
    padding: 20px;
    justify-content: flex-end;
    width: 100%;
  `,
  submitButton: css`
    padding: 10px 30px;
    border: none;
    border-radius: 5px;
    background-color: #242424;
    color: white;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    &:hover {
      background-color: #242424c6;
    }
  `,
  boxContainer: css`
    display: flex;
    justify-content: center;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
  `,
  boxParent: css`
    max-width: 696px;
    margin: 0 auto;
  `,
  box: css`
    flex: 1;
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 20px;
    text-align: center;
    font-size: 24px;
    border-radius: 8px;
  `,
  h6: css`
    text-align: center;
    font-weight: 400;
    font-size: 13px;
  `,
};

export default Collatz;
