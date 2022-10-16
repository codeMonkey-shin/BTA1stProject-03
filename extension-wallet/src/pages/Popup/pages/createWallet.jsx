import React, { useState } from 'react'
import { useEffect } from 'react'
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing'
import * as utils from '../utils/theme'
import { clipboardCopy } from '../utils/copy'
import styled from 'styled-components'
import { Alert, Button, TextField, ThemeProvider } from '@mui/material'
import { StyledButton } from '../components/ui/btn'
import { useNavigate } from 'react-router-dom'
import Header from '../components/header'

const WrapperPopup = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: ${utils.bgColor};
`

const WrapperMnemonic = styled.div`
    width: 80%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 16px;
`
const MnemonicHeader = styled.div`
    color: ${utils.fontColor};
    font-size: 20px;
    padding: 0 0 5% 0;
`

const WrapperAccount = styled.div`
    width: 80%;
    height: 20%;
`
const AccountHeader = styled.div`
    color: ${utils.fontColor};
    font-size: 16px;
`
const WrapperAlert = styled(Alert)`
    width: 80%;
    padding: 5% 0 0 0;
`
const AlertUi = styled.div`
    font-size: 13px;
`

export default function CreateWallet() {
    const [mnemonic, setMnemonic] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        const createMnemo = async () => {
            const wallet = await DirectSecp256k1HdWallet.generate(18)
            const mne = wallet.mnemonic
            setMnemonic(mne)
        }
        //const test = chrome.storage.local.get("test")
        //console.log(test)
        createMnemo()
    }, [])

    return (
        <ThemeProvider theme={utils.theme}>
            <WrapperPopup>
                <div style={{ height: '15%', width: '100%' }}>
                    <Header>W</Header>
                </div>
                <WrapperAlert severity="error">
                    <div>Keep the mnemonic words safe</div>
                    <AlertUi>
                        1. if someone else knows the mnemonic word, they can
                        lose their assets
                    </AlertUi>
                    <AlertUi>2. Store in a safe place to reuse reuse</AlertUi>
                </WrapperAlert>
                <WrapperMnemonic>
                    <MnemonicHeader>
                        mnemonic word
                        <StyledButton
                            color="secondary"
                            variant="outlined"
                            sx={{
                                width: '3%',
                                marginLeft: '4%',
                                padding: '1px',
                            }}
                            onClick={() => clipboardCopy({ text: mnemonic })}
                        >
                            copy
                        </StyledButton>
                    </MnemonicHeader>
                    <div style={{ fontSize: '13px' }}>{mnemonic}</div>
                </WrapperMnemonic>
                <WrapperAccount>
                    <AccountHeader>account</AccountHeader>
                    <TextField
                        sx={{ width: '100%' }}
                        id="standard-password-input"
                        label="Account Name"
                        defaultValue=""
                        variant="standard"
                        color="secondary"
                    ></TextField>
                </WrapperAccount>
                <StyledButton color="secondary" variant="contained">
                    next
                </StyledButton>
                <div style={{ width: '80%' }}>
                    <Button
                        variant="text"
                        color="secondary"
                        style={{ textAlign: 'left' }}
                        onClick={() => navigate(-1)}
                    >
                        {'<-previos'}
                    </Button>
                </div>
            </WrapperPopup>
        </ThemeProvider>
    )
}
