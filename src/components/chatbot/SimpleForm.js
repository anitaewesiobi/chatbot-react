import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from "styled-components";
class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            age: '',
            projectDeadline: '',
            budgetInput: ''
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { name, email, projectDeadline, budgetInput } = steps;

        this.setState({ name, email, projectDeadline, budgetInput });
    }

    render() {
        const { name, email, projectDeadline, budgetInput } = this.state;
        return (
            <div style={{ width: '100%' }}>
                <h3>Summary</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{name.value}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{email.value}</td>
                        </tr>
                        <tr>
                            <td>Project Deadline</td>
                            <td>{projectDeadline.value}</td>
                        </tr>
                        <tr>
                            <td>Budget</td>
                            <td>{budgetInput.value}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Review.propTypes = {
    steps: PropTypes.object,
};

Review.defaultProps = {
    steps: undefined,
};

class SimpleForm extends Component {
    render() {
        const config = {
            width: "300px",
            height: "400px",
            floating: true
        };
        const theme = {
            background: "white",
            fontFamily: "Arial, Helvetica, sans-serif",
            headerBgColor: "#00B2B2",
            headerFontColor: "#fff",
            headerFontSize: "25px",
            botBubbleColor: "#00B2B2",
            botFontColor: "#fff",
            userBubbleColor: "#fff",
            userFontColor: "#4c4c4c"
        };
        const steps = [
            {
                id: "Greet",
                message: "Hello, what brings you to Blueriver? 👋",
                trigger: "reasons"
            },
            {
                id: "reasons",
                options: [
                    {
                        value: "services",
                        label: "I'm a client interested in your services.",
                        trigger: "name-ques"
                    },
                    {
                        value: "help",
                        label: "I would like some help.",
                        trigger: "help-ques"
                    }
                ]
            },
            {
                id: "help-ques",
                message: "Thanks for reaching out. If you have any questions, please send us an email at support@support.com.",
            },
            {
                id: 'name-ques',
                message: "Nice 😀, To get started, what is your name?",
                trigger: 'name',
            },
            {
                id: 'name',
                user: true,
                trigger: 'q-email',
            },
            {
                id: 'q-email',
                message: 'Hi {previousValue}! What is your email? 📧',
                trigger: 'email',
            },
            {
                id: 'email',
                user: true,
                validator: (value) => {
                    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                        return true;
                    }
                    else {
                        return 'Please enter a valid email.';
                    }
                },
                trigger: 'q-project'
            },
            {
                id: "q-project",
                message: "We would love to learn more about your project. When do you need your project completed? 📅",
                trigger: 'projectDeadline'
            },
            {
                id: 'projectDeadline',
                options: [
                    {
                        value: "ASAP",
                        label: "ASAP",
                        trigger: "budget-question"
                    },
                    {
                        value: "weeks to months",
                        label: "Weeks - Months",
                        trigger: "budget-question"
                    },
                    {
                        value: "months to years",
                        label: "Months - Years",
                        trigger: "budget-question"
                    }
                ],

            },
            {
                id: 'budget-question',
                message: 'Awesome, now that we have a better idea of your timeline, whats your average budget for the project?',
                trigger: 'budgetInput',
            },
            {
                id: 'budgetInput',
                user: true,
                trigger: 'pre-review',
            },
            {
                id: 'pre-review',
                message: 'Great! Check out your summary',
                trigger: 'review',
            },
            {
                id: 'review',
                component: <Review
                />,
                asMessage: true,
                trigger: 'update',
            },
            {
                id: 'update',
                message: 'Would you like to update some field?',
                trigger: 'update-question',
            },
            {
                id: 'update-question',
                options: [
                    { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                    { value: 'no', label: 'No', trigger: 'end-message' },
                ],
            },
            {
                id: 'update-yes',
                message: 'What field would you like to update?',
                trigger: 'update-fields',
            },
            {
                id: 'update-fields',
                options: [
                    { value: 'name', label: 'Name', trigger: 'update-name' },
                    { value: 'email', label: 'Email', trigger: 'update-email' },
                    { value: 'projectDeadline', label: 'Project Deadline', trigger: 'update-projectDeadline' },
                    { value: 'budget', label: 'Budget', trigger: 'update-budget' },
                ],
            },
            {
                id: 'update-name',
                update: 'name',
                trigger: 'pre-review',
            },
            {
                id: 'update-email',
                update: 'email',
                trigger: 'pre-review',
            },
            {
                id: 'update-projectDeadline',
                update: 'projectDeadline',
                trigger: 'pre-review',
            },
            {
                id: 'update-budget',
                update: 'budgetInput',
                trigger: 'pre-review',
            },
            {
                id: 'end-message',
                message: 'Thanks for taking the time to speak with us. A member of our team will be in touch shortly!',
                end: true,
            },
        ]
        return (
                <ThemeProvider theme={theme}>
                    <ChatBot steps={steps} {...config} />
                </ThemeProvider>

        );
    }
}
export default SimpleForm