import React from "react";
import { useCallback, useState } from "react";
import {
  Text,
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Form,
  FormField
} from "grommet";

const Attempt = ({ attempt }) => {
  return <Text>{Attempt.timestamp}</Text>;
};

const Target = ({ target }) => {
  return <Text>{JSON.stringify(target)}</Text>;
};

const Subgoals = ({ subgoals }) => {
  return subgoals.map(subgoal => {
    const { name, description, target, attempts } = subgoal;
    return (
      <Box>
        <Text>{name}</Text>
        <Text>{description}</Text>
        <Target target={target} />
        {attempts.map(attempt => (
          <Attempt attempt={attempt} />
        ))}
      </Box>
    );
  });
};

const Goal = ({ goal }) => {
  const { name, description, subgoals } = goal;
  return (
    <AccordionPanel label={name}>
      <Text>{description}</Text>
      <Subgoals subgoals={subgoals} />
    </AccordionPanel>
  );
};

const NewGoal = ({ addNewGoal }) => {
  const handleFormSubmit = useCallback(event => {
    addNewGoal(event.value);
  });
  return (
    <AccordionPanel label="New Goal">
      <Form onSubmit={handleFormSubmit}>
        <FormField name="name" label="Name" />
        <FormField name="description" label="Description" />
        <Button type="submit" primary label="Create" />
      </Form>
    </AccordionPanel>
  );
};

const Goals = () => {
  const initialSubgoal = {
    name: "incline",
    description: "feet on ground",
    target: { "Set 1": 5, "Set 2": 5, "Set 3": 5 },
    attempts: [
      { timestamp: 1438732453, value: { "Set 1": 5, "Set 2": 5, "Set 3": 5 } }
    ]
  };
  const initialGoal = { name: "pull ups", subgoals: [initialSubgoal] };
  const [goals, setGoals] = useState([initialGoal]);
  console.log(goals);
  const addNewGoal = useCallback(goal => {
    setGoals([...goals, goal]);
  }, []);
  return (
    <Accordion>
      {goals
        .map(goal => <Goal key={goal.name} goal={goal} />)
        .concat(<NewGoal key={"NewGoal"} addNewGoal={addNewGoal} />)}
    </Accordion>
  );
};

export const Main = ({ user }) => {
  return (
    <>
      <header>Welcome {user.email}</header>
      <Goals />
    </>
  );
};
