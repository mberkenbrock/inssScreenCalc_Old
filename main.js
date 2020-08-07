const vlTeto = 713.08;
const acimaTeto = 6101.06;
const faixaValorInss = [78.37,94.01,125.37,415.33];
const percentualFaixa = [0.075,0.09,0.12,0.14];
const valorFaixaDesconto = [1045.00,1044.60,1044.80,2966.66];

function apiCalcInss(valor){
    var valorInss = 0;
    var valorRestante = 0;
    var vlAliquota = 0;
    const base1  = document.getElementById("b1");
    const valor1 = document.getElementById("v1");
    const base2  = document.getElementById("b2");
    const valor2 = document.getElementById("v2");
    const base3  = document.getElementById("b3");
    const valor3 = document.getElementById("v3");
    const base4  = document.getElementById("b4");
    const valor4 = document.getElementById("v4");

    base1.innerHTML = 0,00;
    valor1.innerHTML = 0,00;
    base2.innerHTML = 0,00;
    valor2.innerHTML = 0,00;
    base3.innerHTML = 0,00;
    valor3.innerHTML = 0,00;
    base4.innerHTML = 0,00;
    valor4.innerHTML = 0,00;

    if(valor != "" && valor > 0) {
        if(valor >= acimaTeto){
            valorInss = vlTeto;
            base1.innerHTML = valorFaixaDesconto[0];
            valor1.innerHTML = valorFaixaDesconto[0] * percentualFaixa[0];
            base2.innerHTML = valorFaixaDesconto[1];
            valor2.innerHTML = valorFaixaDesconto[1] * percentualFaixa[1];
            base3.innerHTML = valorFaixaDesconto[2];
            valor3.innerHTML = valorFaixaDesconto[2] * percentualFaixa[2];
            base4.innerHTML = valorFaixaDesconto[3];
            valor4.innerHTML = valorFaixaDesconto[3] * percentualFaixa[3];
        }
        else{
            if(valor <= valorFaixaDesconto[0]){
                valorInss = valor * percentualFaixa[0];
                base1.innerHTML = valor;
                valor1.innerHTML = valor * percentualFaixa[0];
            }
            else {     
                valorRestante = valor - valorFaixaDesconto[0]; 
                valorInss = faixaValorInss[0];

                base1.innerHTML = valorFaixaDesconto[0];
                valor1.innerHTML = valorFaixaDesconto[0] * percentualFaixa[0];

                if(valorRestante > valorFaixaDesconto[1]){
                    valorRestante -= valorFaixaDesconto[1]; 
                    valorInss += faixaValorInss[1];

                    base2.innerHTML = valorFaixaDesconto[1];
                    valor2.innerHTML = valorFaixaDesconto[1] * percentualFaixa[1];

                    if(valorRestante > valorFaixaDesconto[2]){
                        valorRestante -= valorFaixaDesconto[2]; 
                        valorInss += faixaValorInss[2];

                        base3.innerHTML = valorFaixaDesconto[2];
                        valor3.innerHTML = valorFaixaDesconto[2] * percentualFaixa[2];

                        if(valorRestante > valorFaixaDesconto[3]){
                            valorInss += faixaValorInss[3];
                            
                            base4.innerHTML = valorFaixaDesconto[3];
                            valor4.innerHTML = valorFaixaDesconto[3] * percentualFaixa[3];
                        }
                        else{
                            valorInss += valorRestante * percentualFaixa[3];
                            base3.innerHTML = valorRestante;
                            valor3.innerHTML = valorRestante * percentualFaixa[3];
                        }
                    }
                    else {
                        valorInss += valorRestante * percentualFaixa[2];
                        base2.innerHTML = valorRestante;
                        valor2.innerHTML = valorRestante * percentualFaixa[2];
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
}