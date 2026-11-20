// Lambda acionada por uma regra do EventBridge (evento StopInstances registrado pelo CloudTrail).
// Handler async: runtimes Node.js atuais (20.x/22.x+) — o estilo com callback foi removido no Node.js 24.
export const handler = async (event) => {
    console.log('LogEC2StopInstance');
    console.log('Received event:', JSON.stringify(event, null, 2));
    return 'Finished';
};
