import React, { useState, useRef } from 'react'
import { render } from 'react-dom'

import './index.html'

interface Inputs {
    title?: string,
    name?: string,
    imageUri?: string,
    tel?: string,
    fax?: string,
    mobileTel?: string,
    email?: string,
    profileUri?: string,
    address?: string,
    facebook?: string,
    twitter?: string,
    instagram?: string,
    youtube?: string,
    linkedin?: string
}

const defaultValues = {
    title: '株式会社ABC 営業部課長',
    name: '鈴木 太郎',
    imageUri: '',
    tel: '0123-456-789',
    fax: '0123-456-789',
    mobileTel: '0123-456-789',
    email: 'yourname@example.com',
    profileUri: 'https://example.com/',
    address: '東京都港区芝公園4丁目 タワービル1F',
    facebook: '',
    twitter: '',
    instagram: '',
    youtube: '',
    linkedin: ''
}

const App = () => {
    const [ inputs, dispatchInputs ] = useState<Inputs>(defaultValues)
    const formElementRef = useRef<HTMLFormElement>(null)
    const displayElementRef = useRef<HTMLDivElement>(null)

    const onFormInput = () => {
        const newInputs: Inputs = {}
        const element = formElementRef.current as any
        if (element == null) return

        newInputs.title = element.title.value
        newInputs.name = element.name.value
        newInputs.imageUri = element.imageUri.value
        newInputs.tel = element.tel.value
        newInputs.fax = element.fax.value
        newInputs.mobileTel = element.mobileTel.value
        newInputs.email = element.email.value
        newInputs.profileUri = element.profileUri.value
        newInputs.address = element.address.value
        newInputs.facebook = element.facebook.value
        newInputs.twitter = element.twitter.value
        newInputs.instagram = element.instagram.value
        newInputs.youtube = element.youtube.value
        newInputs.linkedin = element.linkedin.value

        if (Object.keys(newInputs).every(key => (newInputs as any)[key] == '')) {
            dispatchInputs(defaultValues)
        } else {
            dispatchInputs(newInputs)
        }
    }

    const clearForm = () => {
        formElementRef.current?.reset()
        dispatchInputs(defaultValues)
    }

    const copyAsText = () => {
        if (displayElementRef.current == null) return
        getSelection()?.selectAllChildren(displayElementRef.current)
        document.execCommand('copy')
    }

    const copyAsHtml = () => {
        if (displayElementRef.current == null) return
        const text = displayElementRef.current.innerHTML + document.getElementById('signature-style')?.outerHTML

        const node = document.createElement('div')
        node.textContent = text
        document.body.appendChild(node)
        getSelection()?.selectAllChildren(node)
        document.execCommand('copy')
        document.body.removeChild(node)
    }

    return <>
        <form onInput={ onFormInput } ref={ formElementRef } >
            <label>会社名・肩書: <input id='title' placeholder='株式会社ABC 営業部課長'/></label>
            <label>名前: <input id='name' placeholder='鈴木 太郎'/></label>
            <label>画像: <input id='imageUri' placeholder='画像の URL'/></label>
            <label>TEL: <input id='tel' placeholder='0123-456-789'/></label>
            <label>FAX: <input id='fax' placeholder='0123-456-789'/></label>
            <label>Mobile: <input id='mobileTel' placeholder='0123-456-789'/></label>
            <label>Mail: <input id='email' placeholder='yourmail@example.com'/></label>
            <label>URL: <input id='profileUri' placeholder='https://example.com/'/></label>
            <label>住所: <input id='address' placeholder='東京都港区芝公園4丁目 タワービル1F'/></label>
            <label>Facebook: <input id='facebook' placeholder='account-id'/></label>
            <label>Twitter: <input id='twitter' placeholder='account-id'/></label>
            <label>Instagram: <input id='instagram' placeholder='account-id'/></label>
            <label>YouTube: <input id='youtube' placeholder='チャンネル URL'/></label>
            <label>LinkedIn: <input id='linkedin' placeholder='プロフィールページ URL'/></label>
        </form>
        <div>
            <div id='display' ref={ displayElementRef }>
                { inputs.imageUri && <img className='profile-image' src={ inputs.imageUri } /> }
                <div>
                    { inputs.title && <p className='title'>{ inputs.title }</p> }
                    { inputs.name && <h2 className='name'>{ inputs.name }</h2> }
                    <span>
                        { inputs.tel && <p className='tel'>TEL: { inputs.tel }</p> }
                        { inputs.fax && <p className='fax'>FAX: { inputs.fax }</p> }
                    </span>
                    { inputs.mobileTel && <p className='mobileTel'>Mobile: </p> }
                    { inputs.email && <p className='email'>{ inputs.email }</p> }
                    { inputs.profileUri && <p className='profileUri'>{ inputs.profileUri }</p> }
                    { inputs.address && <p className='address'>{inputs.address}</p> }
                    <span className='socials'>
                        { inputs.facebook && <a target='_blank' className='facebook' href={ 'https://www.facebook.com/' + inputs.facebook }><img alt='Facebook Logo'/></a> }
                        { inputs.twitter && <a target='_blank' className='twitter' href={ 'https://twitter.com/' +  inputs.twitter } ><img alt='Twitter Logo'/></a> }
                        { inputs.instagram && <a target='_blank' className='instagram' href={ 'https://www.instagram.com/' + inputs.instagram }><img alt='Instagram Logo'/></a> }
                        { inputs.youtube && <a target='_blank' className='youtube' href={ inputs.youtube }><img alt='YouTube Logo'/></a> }
                        { inputs.linkedin && <a target='_blank' className='linkedin' href={ inputs.linkedin }><img alt='LinkedIn Logo'/></a> }
                    </span>
                </div>
            </div>
            <div id='actions'>
                <button id='copy-as-text' onClick={ copyAsText }>署名を選択・コピー</button>
                <button id='copy-as-html' onClick={ copyAsHtml }>署名の HTML コードをコピー</button>
                <button id='reset' onClick={ clearForm }>リセットする</button>
            </div>
        </div>
    </>
}

render(
    <App />,
    document.getElementById('app')
)
