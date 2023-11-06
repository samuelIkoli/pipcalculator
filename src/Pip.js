import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button, Form } from 'react-bootstrap'

function Pip() {
    const [from, setFrom] = useState('CAD')
    const [pipValue, setPipValue] = useState(0)
    const [pip, setPip] = useState(1)
    const [lot, setLot] = useState(1)
    const [rate, setRate] = useState(0)
    const [to, setTo] = useState('USD')

    const symbols = [
        'USDCAD', 'EURJPY',
        'EURUSD', 'EURCHF',
        'USDCHF', 'EURGBP',
        'GBPUSD', 'AUDCAD',
        'NZDUSD', 'GBPCHF',
        'AUDUSD', 'GBPJPY',
        'USDJPY', 'CHFJPY',
        'EURCAD', 'AUDJPY',
        'EURAUD', 'AUDNZD'
    ]

    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNH', 'HKD', 'NZD']

    const get_rate = async (e) => {
        e.preventDefault()

        console.log('pip is', pip)
        console.log('lot is', lot)
        console.log('from is', from)
        console.log('currency is', to)
        console.log('12 demo running')
        if (!from || !to || !pip || !lot) {
            return
        }
        const rate = await twelve_demo(from, to)

        return rate
    }
    // Time Series FX (Weekly)
    const alpha_demo = async () => {
        const res = await fetch('https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=EUR&to_symbol=USD&apikey=demo')
        const response = await res.json()
        const rate = response['Time Series FX (Weekly)'][0]
        console.log(rate)
    }
    const twelve_demo = async (from, to) => {
        // e.preventDefault()
        let ex, res, response
        console.log('12 demo running')
        const demo_key = '3086f380e87b4353a4fd98f1a2c71b42'
        const url = `https://api.twelvedata.com/time_series?symbol=${from}/${to}&interval=1day&apikey=${demo_key}`
        console.log(url)
        if (from === to) {
            ex = 1
        }
        else {
            res = await fetch(url)
            response = await res.json()
            ex = response.values[0].close
            console.log(response)
        }
        setRate(ex)
        // console.log('rate is', rate)
        setPipValue(ex * 10 * lot * pip)
        // return rate
    }

    const alpha_key = `TAOECNDNINUR6ZG6`
    const alpha_url = `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${from}&to_symbol=${to}&apikey=${alpha_key}`
    return (
        <div className='py-5 container justify-content-center'>
            <div className="container justify-content-center gray border rounded-5 border-dark">
                <Form className='p-5'>
                    <h1 className='mb-3'>Pip Calculator</h1>
                    <Form.Group className="mb-4" controlId="">
                        <Form.Label>Symbol</Form.Label>
                        <Form.Select className='border rounded-2 border-secondary' aria-label="Default select example" onChange={(e) => {
                            setFrom(e.target.value.slice(3))
                            console.log(e.target.value)
                        }}>
                            {symbols.map((symbol, i) => {
                                return (
                                    <option key={i} value={symbol}>{symbol}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="">
                        <Form.Label>Pip amount</Form.Label>
                        <Form.Control className='border rounded-2 border-secondary' type="number" min={1} placeholder="1" onChange={(e) => {
                            setPip(e.target.value)
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="">
                        <Form.Label>Lot Size</Form.Label>
                        <Form.Control className='border rounded-2 border-secondary' type="number" min={0.01} placeholder="1" onChange={(e) => {
                            setLot(e.target.value)
                        }} />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="">
                        <Form.Label>Account currency</Form.Label>
                        <Form.Select className='border rounded-2 border-secondary' onChange={(e) => {
                            setTo(e.target.value)
                        }}>
                            {currencies.map((currency, i) => {
                                return (
                                    <option key={i} value={currency}>{currency}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <div className="d-flex justify-content-center">
                        <Button variant="success" type="submit" onClick={get_rate}>
                            Calculate
                        </Button>
                        <h2 className='text-success'>{pipValue ? pipValue.toFixed(2) : ''} {pipValue ? to : ''}</h2>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Pip


