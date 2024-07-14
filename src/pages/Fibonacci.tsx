/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import Header from "../components/Header";

const fibonacci = (num: number): [number, number] => {
  if (num <= 0) {
    return [0, 1];
  }

  let prev = 0;
  let next = 1;
  let temp;

  for (let i = 2; i <= num; i++) {
    temp = next;
    next = prev + next;
    prev = temp;
  }

  return [prev, next];
};

const Fibonacci = () => {
  const [number, setNumber] = useState<number>(0);
  const [result, setResult] = useState<number[]>(Array(3).fill(-1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setNumber(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const [prev, next] = fibonacci(number);
    setResult([prev, number, next]);
  };

  return (
    <div css={styles.container}>
      <Header title="" boldText="Fibonacci" />
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
            Submit
          </button>
        </div>
      </form>
      <div css={styles.divider} />
      <div css={styles.boxParent}>
        <span css={styles.h6}>Result</span>
        <div css={styles.boxContainer}>
          {result.map((num, index) => (
            <div key={index} css={styles.box}>
              {num !== -1 ? num : "-"}
            </div>
          ))}
        </div>
      </div>
      <h6 css={styles.h6}>Your number</h6>
    </div>
  );
};

const styles = {
  container: css`
    padding: 20px;
    width: 100%;
  `,
  divider: css`
    border-top: 1px solid #ccc;
    margin: 20px 0;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    align-items: baseline;
    max-width: 696px;
    margin: 0 auto;
    margin-bottom: 20px;
  `,
  input: css`
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
    &:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `,
  boxContainer: css`
    display: flex;
    justify-content: space-around;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 8px;
    gap: 20px;
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
    border-radius: 6px;
  `,
  h6: css`
    text-align: center;
    font-weight: 400;
    font-size: 13px;
  `,
};

export default Fibonacci;
