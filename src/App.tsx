import React, {useEffect, useState} from "react";
import {TreeNode} from "./model/TreeNode";
import {Result} from "./model/Result";
import {ValueOption} from "./model/ValueOption";
import {ConversionValue} from "./model/ConversionValue";
import {LoadingState} from "./model/state/LoadingState";
import {SavingState} from "./model/state/SavingState";
import {AppState} from "./model/state/AppState";
import {ErrorRenderer} from "./utils/ErrorRenderer";
import {makeStyles} from "@material-ui/styles";
import Button from '@material-ui/core/Button/index.js';

const App: React.FC = () => {
    const useStyles = makeStyles({
        body: {
            margin: '2em',
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;",
            backgroundColor: '#F2F2F2'
        },
        content: {
            backgroundColor: '#FFFFFF',
            color: '#333333',
            padding: '2em',
        },
        h1: {
            color: '#006',
        },
        h2: {
            marginTop: 0,
        },
        h3: {
        },
        button: {
            padding: '11px 14px 11px 11px',
            backgroundColor: '#ef7c00',
            border: 'none',
            color: '#FFFFFF',
            fontSize: 'medium',
            fontWeight: 'bold',
            marginRight: '2em',
            cursor: 'pointer',
        },
        results: {
            paddingBottom: '2em',
        },
        resultRow: {
            display: 'flex',
            lineHeight: '1.7em',
        },
        resultQuestion: {
        },
        resultAnswer: {
            paddingLeft: '1em',
            fontWeight: 'bold',
        },
        error: {
            padding: '1em',
            marginTop: '2em',
            border: '1px',
            borderStyle: 'solid',
            borderColor: '#FF2222',
            backgroundColor: '#FF8888',
            color: '#FFFFFF',
            fontWeight: 'bold'
        },
    });

    const [loadingState, setLoadingState] = useState<LoadingState>({
        loading: true
    });
    const [savingState, setSavingState] = useState<SavingState>({
        sending: false
    });
    const [appState, setAppState] = useState<AppState>({
        currentId: 100,
        results: []
    });

    useEffect(() => {
        fetch('data/flow.json')
            .then(response => response.json())
            .then(response => {
                const treeNodes: TreeNode[] = response.map((element: any) => new TreeNode(element))
                return setLoadingState({
                    loading: false,
                    status: 'loaded',
                    treeNodes
                });
            })
            .catch(error => setLoadingState({
                loading: false,
                status: 'error',
                error
            }));
    }, []);

    const resetApp = () => {
        setAppState({currentId: 100, results: []});
        setSavingState({sending: false, error: null})
    }

    const getTreeNode = (id: number | boolean): TreeNode | undefined => {
        if (!loadingState || !loadingState.treeNodes || !id) {
            return undefined;
        }
        return loadingState.treeNodes.find(treeNode => treeNode.id === id);
    }

    const renderLoadingMessage = () => {
        return (
            <div>Lade Fragen...</div>
        );
    }

    const selectOption = (valueOption: ValueOption) => {
        const currentTreeNode = getTreeNode(appState.currentId);
        if (!currentTreeNode) {
            return;
        }
        const result: Result = new Result(currentTreeNode.id, valueOption.value);
        setAppState({
            currentId: valueOption.nextId,
            results: [...appState.results, result]
        });
        if (!valueOption.nextId) {
            sendAnswers();
        }
    };

    const renderQuestionaire = () => {
        const currentTreeNode: TreeNode | undefined = getTreeNode(appState.currentId);
        if (!currentTreeNode) {
            return ErrorRenderer.renderLoadingErrorMessage(classes);
        }

        return (
            <div className={classes.content}>
                <h2 className={classes.h2}>{currentTreeNode.text}</h2>
                <div>{currentTreeNode.valueOptions.map((valueOption: ValueOption, index) => (
                    <Button className={classes.button} key={index} onClick={() => {
                        selectOption(valueOption)
                    }}>{valueOption.text}</Button>
                ))}
                </div>
            </div>
        );
    }

    function getAnswers(result: Result): { question: TreeNode, answer: ValueOption } | undefined {
        const question = getTreeNode(result.id);
        if (!question) {
            return undefined;
        }
        const answer = question.valueOptions.find(valueOption => valueOption.value === result.value);
        if (!answer) {
            return undefined;
        }
        return {question, answer}
    }

    const sendAnswers = () => {
        if (savingState.sending) {
            return;
        }

        setSavingState({sending: true, error: null});
        const data: (ConversionValue | null)[] = appState.results.map((result: Result) => {
            const answers = getAnswers(result);
            if (!answers) {
                return null;
            }
            const {question, answer} = answers;
            return new ConversionValue(question.name, answer.value);
        }).filter(Boolean);

        const requestInit = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(data)
        }

        fetch('https://virtserver.swaggerhub.com/L8475/task/1.0.0/conversation', requestInit)
            .then(() => setSavingState({sending:true, error: null}))
            .catch(err => setSavingState({sending:true, error: err}))
    };

    const renderFinishMessage = () => {
        return (
            <React.Fragment>
                <h2 className={classes.h2}>Herzlichen Dank für Ihre Angaben.</h2>
                <h3 className={classes.h3}>Ihre Auswahl lautet:</h3>
                <div className={classes.results}>
                    {appState.results.map((result: Result) => {
                        const answers = getAnswers(result);
                        if (!answers) {
                            return null;
                        }
                        const {question, answer} = answers;
                        return (
                            <div className={classes.resultRow} key={question.id}>
                                <div className={classes.resultQuestion}>{question.text}</div>
                                <div className={classes.resultAnswer}>{answer.text}</div>
                            </div>
                        );
                    })}
                </div>
                <Button className={classes.button} onClick={() => resetApp()}>Fragebogen neu starten</Button>
            </React.Fragment>
        );
    };

    const classes = useStyles();
    let content;

    if (loadingState.loading) {
        content = renderLoadingMessage();
    } else if (loadingState.error) {
        content = ErrorRenderer.renderLoadingErrorMessage(classes);
    } else if (!appState.currentId) {
        content = renderFinishMessage();
    } else {
        content = renderQuestionaire();
    }
    return (
        <React.Fragment>
            <h1 className={classes.h1}>Fragebogen</h1>
            {content}
            {savingState.error && ErrorRenderer.renderSavingErrorMessage(classes)}
        </React.Fragment>
    );
}

export default App;