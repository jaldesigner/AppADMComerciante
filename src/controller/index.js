import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import INF from '../cfg';
import db from '@react-native-firebase/firestore';

const DB = db().collection('Restaurante').doc(INF().ID_APP);

export const DB_Cardapio_Do_Dia = () => {
  const [carda, setCarda] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = DB.collection('CardapioDoDia').onSnapshot(snp => {
        setCarda(snp.docs);
      });

      return () => unsubscribe();
    }, []),
  );

  function getDb(dados) {
    return dados;
  }
  return getDb(carda);
};

export const DB_Medidas = () => {
  const [medidas, setMedidas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = DB.collection('Medidas').onSnapshot(snp => {
        setMedidas(snp.docs);
      });

      return () => unsubscribe();
    }, []),
  );

  function getDB(medidas) {
    return medidas;
  }
  return getDB(medidas);
};
