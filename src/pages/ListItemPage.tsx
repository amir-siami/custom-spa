/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { css } from "@emotion/react";
import Header from "../components/Header";
import Table from "../components/Table";
import { useUserStore } from "../store/index";

interface UserEntity {
  name: string;
  userName: string;
  email: string;
  phone: string;
  status?: "Active" | "Not Active" | "";
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  userName: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
      "Username must contain both letters and numbers"
    ),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^\d{10,}$/,
      "Phone must be at least 10 digits long and contain only numbers"
    ),
  status: yup
    .mixed<"Active" | "Not Active" | "">()
    .oneOf(["Active", "Not Active", ""], "Invalid status")
    .notRequired(),
});

const ListItemPage: React.FC = () => {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { isValid },
  } = useForm<UserEntity>({
    resolver: yupResolver(schema) as Resolver<UserEntity>,
    mode: "onChange",
  });

  const { users, addUser, updateUser, setCurrentPage, currentPage } =
    useUserStore();
  const [showForm, setShowForm] = useState(false);
  const [editingUserIndex, setEditingUserIndex] = useState<number | null>(null);
  const [mode, setMode] = useState("list");
  const itemsPerPage = 5;

  const onSubmit = (data: UserEntity) => {
    if (editingUserIndex !== null) {
      updateUser(editingUserIndex, data); // Update existing user
    } else {
      addUser(data); // Add new user
    }

    reset(); // Reset form
    setShowForm(false); // Close form
    setMode("list");
  };

  const handleRowClick = (index: number) => {
    const user = users[index];
    setEditingUserIndex(index);
    setMode("edit");
    setShowForm(true);

    // Populate the form with the user's data
    setValue("name", user.name);
    setValue("userName", user.userName);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("status", user.status || "");
  };

  const handleCancelEdit = () => {
    setEditingUserIndex(null);
    reset({
      name: "",
      userName: "",
      email: "",
      phone: "",
      status: "", // Reset to empty string
    });
    setShowForm(false);
    setMode("list");
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    switch (mode) {
      case "create":
        document.title = "Create New Item";
        break;
      case "edit":
        document.title = "Edit Item";
        break;
      default:
        document.title = "List Items";
        break;
    }
  }, [mode]);

  const getHeaderTitle = () => {
    switch (mode) {
      case "create":
        return { title: "New Item", boldText: "Create" };
      case "edit":
        return { title: "Item", boldText: "Edit" };
      default:
        return { title: "Items", boldText: "List" };
    }
  };

  return (
    <div css={styles.container}>
      <Header
        title={getHeaderTitle().title}
        boldText={getHeaderTitle().boldText}
      />

      {showForm ? (
        <form onSubmit={handleSubmit(onSubmit)} css={styles.form}>
          <div css={styles.inputWrapper}>
            <div css={styles.inputContainer}>
              <div css={styles.field}>
                <label>
                  Name <span css={styles.required}>*</span>
                </label>
                <Controller
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input {...field} css={styles.input} />
                      {error && <p css={styles.error}>{error.message}</p>}
                    </>
                  )}
                />
              </div>
              <div css={styles.field}>
                <label>
                  Username <span css={styles.required}>*</span>
                </label>
                <Controller
                  name="userName"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input {...field} css={styles.input} />
                      {error && <p css={styles.error}>{error.message}</p>}
                    </>
                  )}
                />
              </div>
              <div css={styles.field}>
                <label>
                  Email <span css={styles.required}>*</span>
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input {...field} css={styles.input} />
                      {error && <p css={styles.error}>{error.message}</p>}
                    </>
                  )}
                />
              </div>
              <div css={styles.field}>
                <label>
                  Phone <span css={styles.required}>*</span>
                </label>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <input {...field} css={styles.input} />
                      {error && <p css={styles.error}>{error.message}</p>}
                    </>
                  )}
                />
              </div>
            </div>

            <div css={styles.divider} />

            <div css={styles.statusContainer}>
              <div css={styles.field}>
                <label>Status</label>
                <Controller
                  name="status"
                  defaultValue=""
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <select
                        {...field}
                        css={styles.select}
                        value={field.value || ""}
                      >
                        <option value="">Select status</option>
                        <option value="Active">Active</option>
                        <option value="Not Active">Not Active</option>
                      </select>
                      {error && <p css={styles.error}>{error.message}</p>}
                    </>
                  )}
                />
              </div>
            </div>
          </div>

          <div css={styles.submitWrapper}>
            <button type="submit" css={styles.submitButton} disabled={!isValid}>
              {editingUserIndex !== null ? "Save" : "Submit"}
            </button>
            {editingUserIndex !== null && (
              <button
                type="button"
                onClick={handleCancelEdit}
                css={styles.cancelButton}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      ) : (
        <div css={styles.tableContainer}>
          <div css={styles.tableInfo}>
            <span>Items</span>
            <button
              css={styles.addButton}
              onClick={() => {
                setShowForm(true);
                setMode("create");
              }}
            >
              {showForm ? "Cancel" : "Add New Item ➕"}
            </button>
          </div>
          <Table>
            <Table.Header>
              <th>Item</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
            </Table.Header>
            <Table.Body<UserEntity>
              data={paginatedData}
              render={(user, index) => (
                <>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <span
                      css={
                        user.status === "Active"
                          ? styles.statusActive
                          : user.status === "Not Active"
                          ? styles.statusNotActive
                          : styles.statusUnknown
                      }
                    >
                      {user.status || "Unknown"}
                    </span>
                  </td>
                </>
              )}
              onRowClick={(user) => {
                const rowIndex = users.findIndex((u) => u === user);
                handleRowClick(rowIndex);
              }}
            />
          </Table>
          <div css={styles.paginationContainer}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                css={styles.pageButton}
                onClick={() => handlePageChange(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: css`
    padding: 20px;
  `,
  tableInfo: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #e6e6e6;
    border-bottom: transparent;
    padding: 1.5rem 1.5rem;
  `,
  form: css`
    display: flex;
    flex-direction: column;
    gap: 15px;
  `,
  inputWrapper: css`
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    overflow: hidden;
  `,
  inputContainer: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
    padding: 20px;
  `,
  divider: css`
    border-top: 1px solid #ccc;
    margin: 20px 0;
  `,
  statusContainer: css`
    padding: 20px;
    display: grid;
    gap: 15px;
    grid-template-columns: repeat(3, 1fr);
  `,
  field: css`
    display: flex;
    flex-direction: column;
  `,
  input: css`
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  `,
  select: css`
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    font-size: 16px;
    transition: border-color 0.3s;
    width: 100%;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  `,
  required: css`
    color: red;
    margin-left: 5px;
  `,
  error: css`
    color: red;
    font-size: 12px;
  `,
  submitWrapper: css`
    display: flex;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: white;
    overflow: hidden;
    padding: 20px;
    justify-content: flex-end;
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
  cancelButton: css`
    margin-left: 10px;
    padding: 10px 30px;
    border: none;
    border-radius: 5px;
    background-color: #dc3545;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #c82333;
    }
  `,
  addButton: css`
    padding: 5px 10px;
    background-color: #242424;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: #242424c6;
    }
  `,
  tableContainer: css`
    margin-top: 20px;
  `,
  statusActive: css`
    color: #0fbd66;
    font-weight: bold;
    background-color: #ebfff1;
    padding: 4px 8px;
    border-radius: 33px;
  `,
  statusNotActive: css`
    color: #dc362e;
    font-weight: bold;
    background-color: #fceeee;
    padding: 4px 8px;
    border-radius: 33px;
  `,
  statusUnknown: css`
    color: #000;
    font-weight: bold;
    background-color: #f1f1f1;
    padding: 4px 8px;
    border-radius: 33px;
  `,
  paginationContainer: css`
    display: flex;
    justify-content: center;
    margin-top: 20px;
  `,
  pageButton: css`
    padding: 5px 10px;
    margin: 0 5px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    &:disabled {
      background-color: #007bff;
      color: white;
      cursor: not-allowed;
    }
  `,
};

export default ListItemPage;
