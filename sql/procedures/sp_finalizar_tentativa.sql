
-- ============================================================
-- PROJETO: QUIZ EDUCACIONAL
-- EQUIPE: BANCO DE DADOS
-- ARQUIVO: sp_finalizar_tentativa.sql
-- ============================================================
--
-- OBJETIVO:
-- Finalizar uma tentativa de quiz, calculando automaticamente
-- a pontuacao obtida pelo aluno.
--
-- PARAMETRO:
-- p_tentativa_id (INT)
-- Identificador da tentativa que sera finalizada.
--
-- TABELAS UTILIZADAS:
-- 1. tentativa      - Armazena a pontuacao e o status.
-- 2. resposta_aluno - Registra as respostas do aluno.
-- 3. questao        - Informa os pontos de cada questao.
-- 4. alternativa    - Identifica as respostas corretas.
--
-- REGRAS DE NEGOCIO:
-- 1. A tentativa deve existir.
-- 2. A tentativa deve estar EM_ANDAMENTO.
-- 3. Somente respostas corretas geram pontos.
-- 4. Respostas incorretas ou ausentes valem zero.
-- 5. A tentativa nao pode ser finalizada duas vezes.
-- 6. A operacao deve ser executada em uma transacao.
--
-- RESULTADO:
-- Atualiza pontuacao_total, data_hora_fim e status.
--
-- EXEMPLO DE EXECUCAO:
-- CALL sp_finalizar_tentativa(7);
--
-- ATENCAO:
-- O exemplo acima utiliza uma tentativa de teste ja
-- finalizada. Para um novo teste, utilize uma tentativa
-- existente com status EM_ANDAMENTO.
--
-- INTEGRACAO COM O BACKEND:
-- O Node.js devera executar esta procedure quando o
-- aluno concluir o quiz.
--
-- OBSERVACAO DE SEGURANCA:
-- Antes da integracao definitiva, as operacoes de registro
-- de respostas deverao ser coordenadas com esta rotina,
-- evitando alteracoes concorrentes durante a finalizacao.
--
-- ============================================================

USE quiz_ds_db;

-- Remove a versao anterior, caso exista.
-- ATENCAO: a recriacao deve ocorrer em ambiente controlado.
DROP PROCEDURE IF EXISTS sp_finalizar_tentativa;

-- Altera temporariamente o delimitador para permitir
-- comandos SQL dentro do corpo da procedure.
DELIMITER $$

CREATE PROCEDURE sp_finalizar_tentativa(
    IN p_tentativa_id INT
)
BEGIN

    -- --------------------------------------------------------
    -- 1. DECLARACAO DE VARIAVEIS
    -- --------------------------------------------------------

    -- Armazena o status atual da tentativa.
    DECLARE v_status VARCHAR(20) DEFAULT NULL;

    -- Armazena a pontuacao calculada.
    DECLARE v_pontuacao DECIMAL(7,2) DEFAULT 0;

    -- Indica quando a tentativa nao foi encontrada.
    DECLARE v_nao_encontrada BOOLEAN DEFAULT FALSE;


    -- --------------------------------------------------------
    -- 2. TRATAMENTO DE ERROS
    -- --------------------------------------------------------

    -- Detecta quando o SELECT nao encontra a tentativa.
    DECLARE CONTINUE HANDLER FOR NOT FOUND
        SET v_nao_encontrada = TRUE;

    -- Desfaz a transacao em caso de erro SQL e
    -- devolve o erro para a aplicacao.
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;


    -- --------------------------------------------------------
    -- 3. INICIO DA TRANSACAO
    -- --------------------------------------------------------

    START TRANSACTION;


    -- --------------------------------------------------------
    -- 4. CONSULTA E BLOQUEIO DA TENTATIVA
    -- --------------------------------------------------------

    -- FOR UPDATE bloqueia a linha selecionada ate
    -- o encerramento da transacao.
    SELECT status
    INTO v_status
    FROM tentativa
    WHERE id = p_tentativa_id
    FOR UPDATE;


    -- --------------------------------------------------------
    -- 5. VALIDACAO DA EXISTENCIA
    -- --------------------------------------------------------

    IF v_nao_encontrada THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Tentativa nao encontrada.';

    END IF;


    -- --------------------------------------------------------
    -- 6. VALIDACAO DO STATUS
    -- --------------------------------------------------------

    -- Impede que tentativas finalizadas sejam
    -- processadas novamente.
    IF v_status IS NULL OR v_status <> 'EM_ANDAMENTO' THEN

        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'A tentativa nao esta em andamento.';

    END IF;


    -- --------------------------------------------------------
    -- 7. CALCULO DA PONTUACAO
    -- --------------------------------------------------------

    -- Soma os pontos apenas das alternativas corretas.
    -- COALESCE retorna zero quando nao existem
    -- respostas validas para somar.
    SELECT COALESCE(
        SUM(
            CASE
                WHEN a.is_correta = 1 THEN q.pontos
                ELSE 0
            END
        ), 0
    )
    INTO v_pontuacao
    FROM resposta_aluno AS ra

    INNER JOIN questao AS q
        ON q.id = ra.questao_id
       AND q.quiz_id = ra.quiz_id

    INNER JOIN alternativa AS a
        ON a.id = ra.alternativa_escolhida_id
       AND a.questao_id = ra.questao_id

    WHERE ra.tentativa_id = p_tentativa_id;


    -- --------------------------------------------------------
    -- 8. FINALIZACAO DA TENTATIVA
    -- --------------------------------------------------------

    -- Atualiza a pontuacao, a data de conclusao
    -- e o status da tentativa.
    UPDATE tentativa
    SET
        pontuacao_total = v_pontuacao,
        data_hora_fim = NOW(),
        status = 'FINALIZADA'
    WHERE id = p_tentativa_id;


    -- --------------------------------------------------------
    -- 9. CONFIRMACAO DA TRANSACAO
    -- --------------------------------------------------------

    COMMIT;

END $$

-- Restaura o delimitador padrao do MySQL.
DELIMITER ;
