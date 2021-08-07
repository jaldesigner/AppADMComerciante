import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import INF from '../cfg';
import db from '@react-native-firebase/firestore';

const DB = db().collection('Restaurante').doc(INF().ID_APP);

/** ==================================== */
/** carrega o db com os cardápios do dia */
/** ==================================== */
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

/** =================================== */
/** carrega o db de com as Medidas      */
/** =================================== */
export const DB_Medidas = () => {
  const [medidas, setMedidas] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = DB.collection('Medidas').onSnapshot(snp => {
        setMedidas(snp.docs);
      });
      return () => unsubscribe();
    }, [])
  );
  function getDB(medidas) {
    return medidas;
  }
  return getDB(medidas);
};

/** =================================== */
/** carrega o db com as configurações   */
/** =================================== */
export const DB_Configuracao = () => {
  const [config, setConfig] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const unsubscribe = DB.collection('Configuracao').onSnapshot(snp => {
        setConfig(snp.docs);
      });
      return () => unsubscribe();
    }, [])
  );
  function getDb(config) {
    return config;
  }
  return getDb(config);
};
