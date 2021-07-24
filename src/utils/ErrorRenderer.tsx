import React from "react";

export class ErrorRenderer {
    static renderLoadingErrorMessage(classes:any) {
        return (
            <div className={classes.error}>Ein Fehler ist aufgetreten. Bitte probieren Sie es zu einem späteren Zeitpunkt
                erneut.</div>
        );
    }

    static renderSavingErrorMessage(classes:any) {
        return (
            <div className={classes.error}>Ihre Antworten konnten leider nicht gespeichert werden. Bitte probieren Sie es zu
                einem späteren Zeitpunkt erneut.</div>
        );
    }
}

