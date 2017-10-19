import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  public frases: Frase[] = FRASES;
  public instrucao: string = 'Traduza a frase:';
  public resposta: string = '';
  private rodada: number = 0;
  public rodadaFrase: Frase;
  public progresso: number = 0;
  public tentativas: number = 3;

  @Output() public encerrarJogo: EventEmitter<string> = new EventEmitter();

  constructor() {
    this.atualizaRodada();
  }

  ngOnInit() {
  }

  public atualizaResposta(resposta: Event): void {
    this.resposta = (<HTMLInputElement>resposta.target).value;
  }

  public verificarResposta(): void {
    if (this.resposta == this.rodadaFrase.frasePtBr) {
      this.rodada++;
      // atualizando a barra de progresso
      this.progresso += (100 / this.frases.length);

      if (this.rodada == this.frases.length) {
        // fim de jogo
        this.encerrarJogo.emit('vitoria');
      }

      // checa se a rodada é maior que o tamanho do array de frases
      this.atualizaRodada();
    } else {
      // diminuir a variável tentativas
      this.tentativas--;

      if (this.tentativas === -1) {
        this.encerrarJogo.emit('derrota');
      }
    }
  }

  private atualizaRodada(): void {
    // define a frase da rodada
    this.rodadaFrase = this.frases[this.rodada];

    // limpando a resposta
    this.resposta = '';
  }
}
