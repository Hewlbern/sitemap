'use client'
// ApiClientContainer.tsx
import React, { useState, useEffect } from "react";
import ApiClient from "./APIClientView";
import {
  fetchIssues,
  createIssue,
  updateIssue,
  deleteIssue,
  Issue,
} from "./apiService";

const ApiClientContainer = () => {
  const [data, setData] = useState<Issue[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const items = await fetchIssues();
      setData(items);
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to fetch issues:", error);
      setError(`Failed to fetch data: ${error.message}`);
      setLoading(false);
    }
  };

  const handleCreate = async (title: string, description: string) => {
    try {
      setLoading(true);
      await createIssue({ title, description });
      await fetchData();  // Fetch all issues again to refresh the state
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to create issue:", error);
      setError(`Failed to create data: ${error.message}`);
      setLoading(false);
    }
  };

  const handleUpdate = async (
    id: number,
    title: string,
    description: string
  ) => {
    try {
      setLoading(true);
      await updateIssue(id, { title, description });
      await fetchData();  // Fetch all issues again to refresh the state
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to update issue:", error);
      setError(`Failed to update data: ${error.message}`);
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setLoading(true);
      await deleteIssue(id);
      setData(data.filter((item) => item.id !== id));
      setLoading(false);
    } catch (error: any) {
      console.error("Failed to delete issue:", error);
      setError(`Failed to delete data: ${error.message}`);
      setLoading(false);
    }
  };

  return (
    <ApiClient
      data={data}
      loading={loading}
      error={error}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default ApiClientContainer;