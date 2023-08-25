// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use serde::{Deserialize, Serialize};

#[derive(serde::Deserialize)]
struct SearchParamsConsulta {
    id: i32,
    clave: i32,
}

#[tauri::command]
fn search_by_id_consulta(params: SearchParamsConsulta) -> Result<Option<serde_json::Value>, String> {
    let file_contents = fs::read_to_string("data.json").map_err(|err| err.to_string())?;
    let data: Vec<serde_json::Value> = serde_json::from_str(&file_contents).map_err(|err| err.to_string())?;

    let result = data.iter().find(|item| {
        if let Some(item_id) = item["id"].as_i64() {
            if let Some(item_clave) = item["Clave"].as_i64() {
                return item_id == params.id as i64 && item_clave == params.clave as i64;
            }
        }
        false
    });

    Ok(result.cloned())
}


#[derive(Serialize, Deserialize, Clone)] // Added Clone trait
struct Account {
    id: i32,
    Nombre: String,
    Apellido: String,
    Saldo: f64,
    Clave: i32,
    TipoCuenta: String,
}

#[derive(Deserialize)]
struct SearchParamsDeposito {
    id: i32,
    clave: i32,
    monto: f64,
}

#[tauri::command]
fn search_by_id_deposito(params: SearchParamsDeposito) -> Result<Option<Account>, String> {
  let file_contents = fs::read_to_string("data.json").map_err(|err| err.to_string())?;
  let mut data: Vec<Account> = serde_json::from_str(&file_contents).map_err(|err| err.to_string())?;

  if let Some(index) = data.iter().position(|item| item.id == params.id && item.Clave == params.clave) {
      let mut modified_account = data[index].clone();
      modified_account.Saldo += params.monto;
      data[index] = modified_account.clone();
      let data_as_json = serde_json::to_string_pretty(&data).map_err(|err| err.to_string())?;
      fs::write("data.json", data_as_json).map_err(|err| err.to_string())?;
      Ok(Some(modified_account))
  } else {
      Ok(None)
  }
}


#[tauri::command]
fn search_by_id_retiro(params: SearchParamsDeposito) -> Result<Option<Account>, String> {
  let file_contents = fs::read_to_string("data.json").map_err(|err| err.to_string())?;
  let mut data: Vec<Account> = serde_json::from_str(&file_contents).map_err(|err| err.to_string())?;

  if let Some(index) = data.iter().position(|item| item.id == params.id && item.Clave == params.clave) {
      let mut modified_account = data[index].clone();
      modified_account.Saldo -= params.monto;
      data[index] = modified_account.clone();
      let data_as_json = serde_json::to_string_pretty(&data).map_err(|err| err.to_string())?;
      fs::write("data.json", data_as_json).map_err(|err| err.to_string())?;
      Ok(Some(modified_account))
  } else {
      Ok(None)
  }
}

#[tauri::command]
fn get_current_path() -> String {
    std::env::current_dir()
        .unwrap()
        .to_str()
        .unwrap()
        .to_string()
}

fn main() {
  println!("Current working directory: {:?}", std::env::current_dir());
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
          search_by_id_consulta,
          search_by_id_deposito,
          search_by_id_retiro,
          get_current_path
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
