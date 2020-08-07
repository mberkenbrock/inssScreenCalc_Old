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
            base1.innerHTML  = (valorFaixaDesconto[0] - 0.005).toFixed(2);
            valor1.innerHTML = (valorFaixaDesconto[0] * percentualFaixa[0] - 0.005).toFixed(2);
            base2.innerHTML  = (valorFaixaDesconto[1] - 0.005).toFixed(2);
            valor2.innerHTML = (valorFaixaDesconto[1] * percentualFaixa[1] - 0.005).toFixed(2);
            base3.innerHTML  = (valorFaixaDesconto[2] - 0.005).toFixed(2);
            valor3.innerHTML = (valorFaixaDesconto[2] * percentualFaixa[2] - 0.005).toFixed(2);
            base4.innerHTML  = (valorFaixaDesconto[3] - 0.005).toFixed(2);
            valor4.innerHTML = (valorFaixaDesconto[3] * percentualFaixa[3] - 0.005).toFixed(2);
        }
        else{
            if(valor <= valorFaixaDesconto[0]){
                valorInss = valor * percentualFaixa[0];
                base1.innerHTML =  valor.toFixed(2); 
                valor1.innerHTML = (valor * percentualFaixa[0] - 0.005).toFixed(2);
            }
            else {     
                valorRestante = valor - valorFaixaDesconto[0]; 
                valorInss = faixaValorInss[0];

                base1.innerHTML = valorFaixaDesconto[0].toFixed(2);
                valor1.innerHTML = (valorFaixaDesconto[0] * percentualFaixa[0] - 0.005).toFixed(2);

                if(valorRestante > valorFaixaDesconto[1]){
                    valorRestante -= valorFaixaDesconto[1]; 
                    valorInss += faixaValorInss[1];

                    base2.innerHTML = valorFaixaDesconto[1].toFixed(2) ;
                    valor2.innerHTML = (valorFaixaDesconto[1] * percentualFaixa[1] - 0.005).toFixed(2);

                    if(valorRestante > valorFaixaDesconto[2]){
                        valorRestante -= valorFaixaDesconto[2]; 
                        valorInss += faixaValorInss[2];

                        base3.innerHTML = valorFaixaDesconto[2].toFixed(2);
                        valor3.innerHTML = (valorFaixaDesconto[2] * percentualFaixa[2] - 0.005).toFixed(2);

                        if(valorRestante > valorFaixaDesconto[3]){
                            valorInss += faixaValorInss[3];
                            
                            base4.innerHTML = valorFaixaDesconto[3].toFixed(2);
                            valor4.innerHTML = (valorFaixaDesconto[3] * percentualFaixa[3] - 0.005).toFixed(2);
                        }
                        else{
                            valorInss += valorRestante * percentualFaixa[3];
                            base4.innerHTML = (valorRestante - 0.005).toFixed(2);
                            valor4.innerHTML = (valorRestante * percentualFaixa[3] - 0.005).toFixed(2);
                        }
                    }
                    else {
                        valorInss += valorRestante * percentualFaixa[2];
                        base3.innerHTML = (valorRestante - 0.005).toFixed(2);
                        valor3.innerHTML = (valorRestante * percentualFaixa[2] - 0.005).toFixed(2);
                    }
                }
                else{
                    valorInss += valorRestante * percentualFaixa[1];
                    base2.innerHTML = (valorRestante - 0.005).toFixed(2);
                    valor2.innerHTML = (valorRestante * percentualFaixa[0] - 0.005).toFixed(2);

                }
            }
        }
        let totalBase = 0;
        let totalValor = 0;
        
        totalBase = base1.innerHTML + base2.innerHTML + base3.innerHTML + base4.innerHTML;

        totalValor = valor1.innerHTML + valor2.innerHTML + valor3.innerHTML + valor4.innerHTML;
        document.getElementById("tb").innerHTML = totalBase.toFixed(2);
        document.getElementById("tb").innerHTML = totalValor.toFixed(2);
        calcInss.value =   (valorInss - 0.005).toFixed(2);
        vlAliquota = valor < acimaTeto ? ((valorInss / valor) * 100).toFixed(2) : '14.00';
        aliquota.value = vlAliquota + '%';
    }
}