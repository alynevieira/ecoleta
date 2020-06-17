import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FiUpload } from 'react-icons/fi'
 
import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void;
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
    // colocar um prevew da imagem, vou obter
    const [selectedFileUrl, setSelectedFileUrl] = useState('');
// useCallback memorizar uma função para que ela seja recriada ou recarregada
// somente quando um valor de uma variavel mudar
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
    }, [onFileUploaded])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'image/*'
    });

    // o input é p deixar desab imagens q n sao imagem
    // se a pessoa tirar do inspecionar elemento, a lib já esta configurada
    return (
        <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} accept="image/*" />
            {
                selectedFileUrl
                ? <img src={selectedFileUrl} alt="Point Thumbnail"/>
                : isDragActive ?
                    <p>
                        <FiUpload />
                        Coloque o arquivo aqui...</p> :
                    <p>
                        <FiUpload />
                        Arraste os arquivos aqui, ou clique para selecionar um</p>
            }
        </div>
    )


}

export default Dropzone;