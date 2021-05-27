const vlTeto = 751.97;
const acimaTeto = 6433.57;
const faixaValorInss = [82.50,99.31,132.20,437.96];
const percentualFaixa = [0.075,0.09,0.12,0.14];
const valorFaixaDesconto = [1100.00,1103.47,1101.73,3128.31];


function fnValorFormatado(valor){
    var valor20 =  (valor * 100).toString();
    var len = valor20.length;
    var valorFormatado2 = valor20.substring(0, len - 2) + "." + valor20.substring(len - 2);

    return valorFormatado2;
}

function apiCalcInss(valor){
    var valorInss = 0;
    var valorRestante = 0;
    var vlAliquota = 0;
    var totalValor = 0;
    
    const base1  = document.getElementById("b1");
    const valor1 = document.getElementById("v1");
    const base2  = document.getElementById("b2");
    const valor2 = document.getElementById("v2");
    const base3  = document.getElementById("b3");
    const valor3 = document.getElementById("v3");
    const base4  = document.getElementById("b4");
    const valor4 = document.getElementById("v4");

    base1.innerHTML = '0.00';
    valor1.innerHTML = '0.00';
    base2.innerHTML = '0.00';
    valor2.innerHTML = '0.00';
    base3.innerHTML = '0.00';
    valor3.innerHTML = '0.00';
    base4.innerHTML = '0.00';
    valor4.innerHTML = '0.00';
    document.getElementById("tv").innerHTML = '0.00'
    document.getElementById("tb").innerHTML = '0.00'

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
                base1.innerHTML =  fnValorFormatado(valor);
                valor1.innerHTML = (valor * percentualFaixa[0]).toFixed(2);
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
                        valor3.innerHTML = (valorFaixaDesconto[2] * percentualFaixa[2]).toFixed(2);


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
                    base2.innerHTML = (valorRestante).toFixed(2);
                    valor2.innerHTML = (valorRestante * percentualFaixa[1]).toFixed(2);
                }
            }
        }

        calcInss.value =   (valorInss - 0.005).toFixed(2);
        vlAliquota = valor < acimaTeto ? ((valorInss / valor) * 100).toFixed(2) : '11.69';
        aliquota.value = vlAliquota + '%';

        var valor10 = valor > acimaTeto ? acimaTeto * 100 : valor * 100;
        valor10 = valor10.toString();
        var len = valor10.length;
        var valorFormatado = valor10.substring(0, len - 2) + "." + valor10.substring(len - 2);
        
        var total = parseFloat(valor1.innerHTML) + parseFloat(valor2.innerHTML) + parseFloat(valor3.innerHTML) +  parseFloat(valor4.innerHTML);
        
        total = (total).toFixed(2);

        if(parseFloat(total) > parseFloat(calcInss.value)){
            calcInss.value = total;            
        }
        
        document.getElementById("tv").innerHTML = calcInss.value;
        document.getElementById("tb").innerHTML = valorFormatado;
    }
    else{
        aliquota.value = '0,00%';
        calcInss.value = '0.00';
    }
}

