"use client";
import React, { FormEvent, useState } from "react";
import { Issue } from "./apiService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ApiClientProps {
  data: Issue[];
  loading: boolean;
  error: string | null;
  onCreate: (title: string, description: string) => void;
  onUpdate: (id: number, title: string, description: string) => void;
  onDelete: (id: number) => void;
}

const ApiClient: React.FC<ApiClientProps> = ({
  data,
  loading,
  error,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  // State for creating a new issue
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // State to manage edits
  const [editState, setEditState] = useState<{
    [key: number]: { title: string; description: string };
  }>({});

  const handleEditChange = (
    id: number,
    field: "title" | "description",
    value: string
  ) => {
    setEditState((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
  };

  const handleUpdateClick = (id: number) => {
    const issue = editState[id];
    onUpdate(id, issue.title, issue.description);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(newTitle, newDescription);
    setNewTitle("");
    setNewDescription("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white py-4 px-6">
        <h1 className="text-2xl font-bold">Sitemap Test</h1>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">REST API Client</h1>
        {loading && <div className="mb-4">Loading...</div>}
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="w-full max-w-4xl">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Actions</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[80px]">ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex flex-col sm:flex-row justify-end gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleUpdateClick(item.id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={editState[item.id]?.title ?? item.title}
                          onChange={(e) =>
                            handleEditChange(item.id, "title", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea
                          value={
                            editState[item.id]?.description ?? item.description
                          }
                          onChange={(e) =>
                            handleEditChange(
                              item.id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>{item.id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Create Item</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Title</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      required
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                    />
                  </div>
                  <Button type="submit">Create</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ApiClient;
