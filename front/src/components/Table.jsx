import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import MuiButton from './Button';
import ModalForm from './ModalForm';
import MyComponent from './MyComponent';

const styles = {
    cellButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 10
    },
};

export default function BasicTable() {
    // État pour stocker les données récupérées
    const [data, setData] = React.useState([]);
    // État pour contrôler l'ouverture du modal et la modification des données
    const [editItem, setEditItem] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);

    // Fonction pour récupérer les données via Axios
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/notes");
            console.log("Données récupérées :", response.data);
            setData(response.data);
        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    // Fonction pour gérer le clic sur le bouton "Modifier"
    const handleEditClick = (item) => {
        setEditItem(item);
        setIsEditing(true);
        setOpen(true);
    };

    // Fonction pour gérer le clic sur le bouton "Ajouter"
    const handleAddClick = () => {
        setEditItem(null);
        setIsEditing(false);
        setOpen(true);
    };

    const handleDelete = async (item) => {
        try {
            await axios.delete(`http://localhost:3000/api/notes/${item.id}`);
            fetchData();
        } catch (error) {
            console.error("Erreur lors de la suppression des données :", error);
        }
    };

    // Fonction pour gérer la fermeture du modal
    const handleClose = () => {
        setOpen(false);
        setEditItem(null);
    };

    // Fonction pour gérer la modification ou l'ajout des données
    const handleSave = async (item) => {
        try {
            if (isEditing) {
                await axios.put(`http://localhost:3000/api/notes/${item.id}`, item);
            } else {
                await axios.post("http://localhost:3000/api/notes", item);
            }
            fetchData();
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des données :", error);
        }
    };

    // Appeler fetchData lors du premier rendu du composant
    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <MyComponent onClick={handleAddClick} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, marginTop: 10 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Title</TableCell>
                            <TableCell align="right">Content</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">{row.title}</TableCell>
                                <TableCell align="right">{row.content}</TableCell>
                                <TableCell style={styles.cellButtonContainer}>
                                    <MuiButton
                                        color={'success'}
                                        text={'Modifier'}
                                        onClick={() => handleEditClick(row)}
                                    />
                                    <MuiButton
                                        color={'error'}
                                        text={'Supprimer'}
                                        onClick={() => handleDelete(row)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Modal pour la modification et l'ajout */}
            <ModalForm
                open={open}
                onClose={handleClose}
                onSave={handleSave}
                item={editItem}
                isEditing={isEditing}
            />
        </>
    );
}
