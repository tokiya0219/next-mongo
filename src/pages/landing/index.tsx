import { getTodos } from "@/lib/todo-db";
import { TodoClass } from "@/models/Todo";
import { FlattenMaps, ObjectId, Types } from "mongoose";
import { GetStaticProps } from "next"
import Link from "next/link";

interface todosResponseType {
    _id: string,
title: string,
completed: boolean,
createdAt: string,
updatedAt: string,
__v: number,
id: string
}

export const getStaticProps: GetStaticProps<any> = async () => {
    try {
    const { todos } = await getTodos();
    if(!todos?.length) {
        return {
            props: {
                todos: []
            }
        }
    }
    return {
        props: {
            todos: JSON.parse(JSON.stringify(todos))
        }
    };
    } catch (e) {
        return {
            notFound: true
        }
    }
}

const Landing = (props: {
    todos: any
}) => {
    console.log(props.todos);
    const todos = props.todos as Array<todosResponseType>;
    return (
        <div>
        <Link href="/">back to writing</Link>
    {todos.length ? (
        todos.map(todo => (
            <div key={todo.id}>
                <p>{todo.title}</p>
                <span>{todo.createdAt}</span>
            </div>
        ))
    ): (
        <></>
    )}
    </div>
    )
}

export default Landing;