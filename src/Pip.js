import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import { Button, Form } from 'react-bootstrap'

function Pip() {
    const [from, setFrom] = useState('USD')
    const [pipValue, setPipValue] = useState(0)
    const [pip, setPip] = useState(1)
    const [lot, setLot] = useState(1)
    const [to, setTo] = useState('USD')


    const symbols = [
        'GBPUSD', 'EURJPY',
        'EURUSD', 'EURCHF',
        'USDCHF', 'EURGBP',
        'USDCAD', 'AUDCAD',
        'NZDUSD', 'GBPCHF',
        'AUDUSD', 'GBPJPY',
        'USDJPY', 'CHFJPY',
        'EURCAD', 'AUDJPY',
        'EURAUD', 'AUDNZD'
    ]

    const currencies = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'CNH', 'HKD', 'NZD']

    const get_rate = async (e) => {
        e.preventDefault()
        if (!from || !to || !pip || !lot) {
            return
        }
        const rate = await twelve_demo(from, to)

        return rate
    }
    // Time Series FX (Weekly)
    // const alpha_demo = async () => {
    //     const res = await fetch('https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=EUR&to_symbol=USD&apikey=demo')
    //     const response = await res.json()
    //     const rate = response['Time Series FX (Weekly)'][0]
    //     console.log(rate)
    // }
    const twelve_demo = async (from, to) => {
        let ex, res, response
        const demo_key = '3086f380e87b4353a4fd98f1a2c71b42'
        const url = `https://api.twelvedata.com/time_series?symbol=${from}/${to}&interval=1day&apikey=${demo_key}`
        if (from === to) {
            ex = 1
        }
        else {
            res = await fetch(url)
            response = await res.json()
            ex = response.values[0].close
        }
        setPipValue(ex * 10 * lot * pip)
    }

    // const alpha_key = `TAOECNDNINUR6ZG6`
    // const alpha_url = `https://www.alphavantage.co/query?function=FX_WEEKLY&from_symbol=${from}&to_symbol=${to}&apikey=${alpha_key}`
    return (
        <div className='py-5 container justify-content-center App'>
            <div className="container justify-content-center gray border rounded-5 border-dark">
                <Form className='p-5'>
                    <h1 className='mb-3'>Pip Calculator</h1>
                    <Form.Group className="mb-4" controlId="">
                        <Form.Label>Symbol</Form.Label>
                        <Form.Select className='border rounded-2 border-secondary' aria-label="Default select example" onChange={(e) => {
                            setFrom(e.target.value.slice(3))
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
                    <div className="container justify-content-around">
                        <div className="row ">
                            <div className="col justify-content-center d-flex align-items-center">
                                <Button variant="success" type="submit" onClick={get_rate}>
                                    Calculate
                                </Button>
                            </div>
                            <div className="col justify-content-center d-flex align-items-center border rounded-2 border-secondary">
                                <h2 className='text-success my-auto'>{pipValue ? pipValue.toFixed(2) : ''} {pipValue ? to : ''}</h2>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'><p>Note that this is just an estimate to aid trading. Real values may deviate slightly.</p></div>
                </Form>
            </div>
        </div>
    )
}

export default Pip


