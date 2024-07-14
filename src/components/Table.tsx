/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface TableProps {
  children: React.ReactNode;
}

const StyledTable = ({ children }: TableProps) => (
  <table css={styles.table}>{children}</table>
);

const Header = ({ children }: { children: React.ReactNode }) => (
  <thead css={styles.header}>
    <tr>{children}</tr>
  </thead>
);

const Body = <T,>({
  data,
  render,
  onRowClick,
}: {
  data: T[];
  render: (item: T, index: number) => React.ReactNode;
  onRowClick?: (item: T, index: number) => void;
}) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={6} css={styles.empty}>
            <p css={styles.empty}>No users added yet. Please add a new user.</p>
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {data.map((item, index) => (
        <tr
          key={index}
          css={styles.row}
          onClick={() => onRowClick && onRowClick(item, index)}
        >
          {render(item, index)}
        </tr>
      ))}
    </tbody>
  );
};

const Table = ({ children }: TableProps) => (
  <StyledTable>{children}</StyledTable>
);

Table.Header = Header;
Table.Body = Body;

export default Table;

const styles = {
  table: css`
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e6e6e6;
    font-size: 12px;
    font-weight: 400;
    border-radius: 7px;
    text-align: left;
    td {
      padding: 1rem 1.5rem;
    }
  `,
  header: css`
    background-color: #fafafa;
    letter-spacing: 0.4px;
    font-weight: 600;
    th {
      padding: 1rem 1.5rem;
      border-bottom: 1px solid #e6e6e6;
    }
  `,
  row: css`
    border-bottom: 1px solid #e6e6e6;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0; /* Change to your desired hover color */
    }
  `,
  empty: css`
    font-size: 1.4rem;
    font-weight: 500;
    text-align: center;
    margin: 2.4rem;
  `,
};
