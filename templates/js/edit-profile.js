document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('edit-profile-form');
    const messageDiv = document.getElementById('form-message');
    const nomeCompletoInput = document.getElementById('nome_completo');
    const nomeUsuarioInput = document.getElementById('nome_usuario');
    const biografiaInput = document.getElementById('biografia');
    const fotoIdInput = document.getElementById('id_foto_perfil');

    try {
        messageDiv.innerHTML = '<div class="text-center"><div class="spinner-border spinner-border-sm" role="status"><span class="visually-hidden">Loading...</span></div> Carregando seus dados...</div>';

        const response = await fetch('/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error('Falha ao carregar os dados do perfil.');
        }

        const user = await response.json();

        nomeCompletoInput.value = user.nome_completo || '';
        nomeUsuarioInput.value = user.nome_usuario || '';
        biografiaInput.value = user.biografia || '';
        fotoIdInput.value = user.id_foto_perfil || 1;
        
        messageDiv.innerHTML = '';

    } catch (error) {
        console.error("Erro ao carregar perfil:", error);
        messageDiv.innerHTML = '<div class="alert alert-danger">Não foi possível carregar seus dados para edição.</div>';
    }


    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        messageDiv.innerHTML = '';

        const updatedData = {
            nome_completo: nomeCompletoInput.value,
            nome_usuario: nomeUsuarioInput.value,
            biografia: biografiaInput.value,
            id_foto_perfil: parseInt(fotoIdInput.value, 10) || 1,
        };

        try {
            const response = await fetch('/api/users/editar', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatedData)
            });

            const result = await response.json();

            if (response.ok) {
                messageDiv.innerHTML = '<div class="alert alert-success">Perfil atualizado com sucesso! Redirecionando...</div>';
                setTimeout(() => {
                    window.location.href = 'profile.html';
                }, 2000);
            } else {
                messageDiv.innerHTML = `<div class="alert alert-danger">${result.error || 'Ocorreu um erro ao atualizar.'}</div>`;
            }

        } catch (error) {
            console.error("Erro ao atualizar perfil:", error);
            messageDiv.innerHTML = '<div class="alert alert-danger">Falha na comunicação com o servidor.</div>';
        }
    });
});