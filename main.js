const vlTeto = 713.08;
const acimaTeto = 6101.06;
const faixaValorInss = [78.37,94.01,125.37,415.33];
const percentualFaixa = [0.075,0.09,0.12,0.14];
const valorFaixaDesconto = [1045.00,1044.60,1044.80,2966.66];

function apiCalcInss(valor){
    var valorInss = 0;
    var valorRestante = 0;
    var vlAliquota = 0;

    if(valor >= acimaTeto){
        valorInss = vlTeto;
    }
    else{
        if(valor <= valorFaixaDesconto[0]){
            valorInss = valor * percentualFaixa[0];
        }
        else {
            valorRestante = valor - valorFaixaDesconto[0]; 
            valorInss = faixaValorInss[0];

            if(valorRestante > valorFaixaDesconto[1]){
                valorRestante -= valorFaixaDesconto[1]; 
                valorInss += faixaValorInss[1];

                if(valorRestante > valorFaixaDesconto[2]){
                    valorRestante -= valorFaixaDesconto[2]; 
                    valorInss += faixaValorInss[2];

                    if(valorRestante > valorFaixaDesconto[3]){
                        valorInss += faixaValorInss[3];
                    }
                    else{
                        valorInss += valorRestante * percentualFaixa[3];
                    }
                }
                else {
                    valorInss += valorRestante * percentualFaixa[2];
                }
            }
            else{
                valorInss += valorRestante * percentualFaixa[1];
            }
        }
    }
    calcInss.value = (valorInss - 0.005).toFixed(2);
	
    vlAliquota = valor < acimaTeto ? ((valorInss / valor) * 100).toFixed(2) : '14.00';
    aliquota.value = vlAliquota + '%';
}