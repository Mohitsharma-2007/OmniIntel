import os
import shutil

vault_path = r"e:\OmniIntel\backend\data\intelligence_vault"
if os.path.exists(vault_path):
    for filename in os.listdir(vault_path):
        file_path = os.path.join(vault_path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
            print(f"Deleted: {filename}")
        except Exception as e:
            print(f'Failed to delete {file_path}. Reason: {e}')
else:
    os.makedirs(vault_path)
    print("Vault directory created.")
