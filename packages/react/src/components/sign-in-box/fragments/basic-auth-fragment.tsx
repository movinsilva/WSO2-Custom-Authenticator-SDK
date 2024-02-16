import Button from "@oxygen-ui/react/Button";
import Checkbox from "@oxygen-ui/react/Checkbox";
import FormControlLabel from "@oxygen-ui/react/FormControlLabel";
import FormGroup from "@oxygen-ui/react/FormGroup";
import TextField from "@oxygen-ui/react/TextField";
import Typography from "@oxygen-ui/react/Typography";
import React, { ReactElement, useState } from "react"

const BasicAuthFragment = ({handleAuthenticate}: { handleAuthenticate: Function }): ReactElement => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="basic-auth-fragment" >
            <Typography align="center" className="oxygen-sign-in-header" variant="h4">
                Sign in
            </Typography>
                <TextField
                    required
                    fullWidth
                    autoComplete="off"
                    label="Username"
                    name="text"
                    value={ username }
                    placeholder="Enter your Username"
                    className="non-interactive"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    required
                    fullWidth
                    name="password"
                    autoComplete="new-password"
                    label="Password"
                    type="password"
                    value={ password }
                    placeholder="Enter your password"
                    className="non-interactive"
                    onChange={(e) => setPassword(e.target.value)}
                />
            <FormGroup className="non-interactive">
                <FormControlLabel
                    control={ <Checkbox color="secondary" /> }
                    label="Remember me on this computer"
                />
            </FormGroup>
            <Button
                color="primary"
                variant="contained"
                className="oxygen-sign-in-cta non-interactive"
                type="submit"
                fullWidth
                onClick={()=> {handleAuthenticate(username, password)}}
            >
                Submit
            </Button>
        </div>
    );
};

/**
 * Default props for the Basic Auth fragment component.
 */
BasicAuthFragment.defaultProps = {
    "data-componentid": "basic-auth-fragment"
};

export default BasicAuthFragment;


