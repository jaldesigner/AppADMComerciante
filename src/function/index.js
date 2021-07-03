import React, { useEffect, useState,useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import db from '@react-native-firebase/firestore';
import DadosApp from '../cfg';

export default function NivelADM() {
  const aut = auth();
  const INF = DadosApp();
  const ft = db().collection(INF.Categoria).doc(INF.ID_APP);
  const [nivel, setNivel] = useState('');
  //const [array, setNivel] = useState('');
  
  var email = aut.currentUser;
  useFocusEffect(useCallback(() => {
    const unsubscribe = ft.collection('ADM')
      .where('email', '==', email.email)
      .onSnapshot(snp => {
        setNivel(snp.docs[0].data());
      });
    return () => unsubscribe();
  }, []));
 

  return nivel;

};

export const MoedaReal = (valor) => {
  var valor = valor.toFixed(2).split('.');
  valor[0] = "R$ " + valor[0].split(/(?=(?:...)*$)/).join('.');
  return valor.join(',');
};

export const maskCPF = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const maskCEP = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d{3})/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

export const maskTel = value => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d{4})/, "$1-$2");
};

export const maskDinheiro = val => {
  var v = val.replace(/\D/g, '');
  v = (v / 100).toFixed(2) + '';
  v = v.replace(".", ",");
  v = v.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  v = v.replace(/(\d)(\d{3}),/g, "$1.$2,");
  val = v;
  return v;
};
