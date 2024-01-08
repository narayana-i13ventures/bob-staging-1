import { createSlice } from "@reduxjs/toolkit";

const initialState: any = [
    {
        team_id: '1',
        team_name: 'I13ventures',
        created_on: '2024-01-05T08:45:00Z',
        modified_on: '2024-01-05T10:30:00Z',
        description: 'A collaborative team for innovative ventures',
        users: [
            {
                username: 'jhon_dave',
                display_name: 'Jhon Dave',
                first_name: 'Jhon',
                last_name: 'Dave',
                email: 'jhondave@example.com',
                image: 'path/to/user/image.jpg',
                joined_on: '2024-01-05T09:15:00Z',
                role: 'Team Member',
            },
            {
                username: 'alice_smith',
                display_name: 'Alice Smith',
                first_name: 'Alice',
                last_name: 'Smith',
                email: 'alicesmith@example.com',
                image: 'path/to/user/image.jpg',
                joined_on: '2024-01-05T09:30:00Z',
                role: 'Team Lead',
            },
            {
                username: 'bob_johnson',
                display_name: 'Bob Johnson',
                first_name: 'Bob',
                last_name: 'Johnson',
                email: 'bobjohnson@example.com',
                image: 'path/to/user/image.jpg',
                joined_on: '2024-01-05T09:45:00Z',
                role: 'Team Member',
            },
            {
                username: 'eva_brown',
                display_name: 'Eva Brown',
                first_name: 'Eva',
                last_name: 'Brown',
                email: 'evabrown@example.com',
                image: 'path/to/user/image.jpg',
                joined_on: '2024-01-05T10:00:00Z',
                role: 'Team Member',
            },
            {
                username: 'charlie_white',
                display_name: 'Charlie White',
                first_name: 'Charlie',
                last_name: 'White',
                email: 'charliewhite@example.com',
                image: 'path/to/user/image.jpg',
                joined_on: '2024-01-05T10:15:00Z',
                role: 'Team Member',
            },
        ],
        projects: []
    },
];

export const pruchaseHistorySlice = createSlice({
    name: "pruchaseHistory",
    initialState,
    reducers: {},
});
